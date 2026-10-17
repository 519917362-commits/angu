#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
图片资产优化脚本
- 分析 uploads/ 与 public/images/ 中被引用的图片
- 照片类 PNG（无真实透明通道）→ 转 JPEG q85；JPEG → 重编码 q82（渐进式）
- 超宽图片 → 缩到上限；保留透明通道的 PNG → 优化 + 256 色量化
- 重命名文件后同步更新 SQLite 中所有引用（字符串级替换）
- 用法: python3 optimize-images.py [--apply]
"""
import json
import os
import shutil
import sqlite3
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = 200_000_000  # 允许处理大图

BASE = Path(__file__).resolve().parent.parent  # 项目根
BACKEND = BASE / "backend"
UPLOADS = BACKEND / "uploads"
PUBLIC = BASE / "public"
DB = BACKEND / "inquiries.db"

MAX_W_UPLOAD = 1600   # 上传图（产品/项目）宽度上限
MAX_W_BANNER = 1920   # 横幅等全屏图宽度上限
MAX_W_PUBLIC = 1920   # public 静态图宽度上限
BLoat_THRESHOLD = 300_000  # 小于此体积的 JPEG 不动

APPLY = "--apply" in sys.argv
TS = datetime.now().strftime("%Y%m%d_%H%M%S")


def kb(n):
    return f"{n/1024:.0f}KB"


def real_transparency(im: Image.Image) -> float:
    """返回透明像素占比（0~1）。无 alpha 通道返回 0。"""
    if im.mode not in ("RGBA", "LA", "PA"):
        return 0.0
    alpha = im.convert("RGBA").getchannel("A")
    hist = alpha.histogram()
    total = sum(hist)
    if total == 0:
        return 0.0
    transparent = sum(hist[:250])  # alpha < 250 视为透明/半透明
    return transparent / total


def load_db_refs() -> dict:
    """扫描所有表所有文本列，收集 /uploads/ 与 /images/ 引用 -> 出现位置列表"""
    refs = {}
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    tables = [r[0] for r in cur.execute(
        "SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
    for t in tables:
        if t == "sqlite_sequence":
            continue
        cols = [r[1] for r in cur.execute(f"PRAGMA table_info({t})").fetchall()]
        cur.execute(f"SELECT * FROM {t}")
        col_idx = {d[0]: i for i, d in enumerate(cur.description)}
        for row in cur.fetchall():
            for c in cols:
                v = row[col_idx[c]]
                if not isinstance(v, str):
                    continue
                for marker in ("/uploads/", "/images/"):
                    if marker in v:
                        for part in v.split('"'):
                            pass
                        # 粗匹配所有路径片段
                        import re
                        for m in re.findall(r"/(?:uploads|images)/[A-Za-z0-9._-]+", v):
                            refs.setdefault(m, set()).add(f"{t}.{c}")
    conn.close()
    return refs


def collect_files():
    """返回 [(路径, 是否为上传目录)] 仅收集被引用或 public 静态图"""
    db_refs = load_db_refs()
    files = []
    # uploads/ 中被引用的
    if UPLOADS.exists():
        for f in UPLOADS.iterdir():
            if f.is_file() and f".suffix" != ".part" and f"/uploads/{f.name}" in db_refs:
                files.append((f, True))
    # public/images/ 全部静态图（都被代码引用）
    if (PUBLIC / "images").exists():
        for f in (PUBLIC / "images").rglob("*"):
            if f.is_file() and f.suffix.lower() in (".jpg", ".jpeg", ".png"):
                files.append((f, False))
    # og-image.png
    og = PUBLIC / "og-image.png"
    if og.exists():
        files.append((og, False))
    return files, db_refs


def plan_for(path: Path, is_upload: bool):
    """返回 (动作, 目标路径, 预估节省) or None"""
    try:
        im = Image.open(path)
        im.load()
    except Exception as e:
        return ("skip_error", path, f"无法读取: {e}")
    w, h = im.size
    max_w = MAX_W_UPLOAD if is_upload else (MAX_W_BANNER if "banner" in str(path) or "og-image" in str(path) else MAX_W_PUBLIC)
    transp = real_transparency(im)
    orig_size = path.stat().st_size
    name = path.name.lower()

    # 已是 webp / 小文件
    if path.suffix.lower() == ".webp":
        return None
    if name.startswith("logo"):
        return None

    # 1) 照片类 PNG（无真实透明）→ JPEG
    if path.suffix.lower() == ".png" and transp < 0.005:
        return ("png_to_jpg", path.with_suffix(".jpg"), None)
    # 2) 有透明的 PNG
    if path.suffix.lower() == ".png":
        return ("opt_png", path, None)
    # 3) JPEG：超大或超宽才动
    if path.suffix.lower() in (".jpg", ".jpeg"):
        if w > max_w or orig_size > BLoat_THRESHOLD:
            return ("opt_jpg", path, None)
        return None
    return None


def apply_action(action: str, src: Path, dst: Path):
    before = src.stat().st_size
    im = Image.open(src)
    im.load()
    w, h = im.size

    if action == "png_to_jpg":
        max_w = MAX_W_UPLOAD if "uploads" in str(src) else MAX_W_PUBLIC
        if w > max_w:
            im = im.resize((max_w, int(h * max_w / w)), Image.LANCZOS)
        # 合成到白底（防止边缘半透明像素变黑）
        if im.mode in ("RGBA", "LA", "PA"):
            bg = Image.new("RGB", im.size, (255, 255, 255))
            mask = im.convert("RGBA").getchannel("A")
            bg.paste(im.convert("RGBA"), mask=mask)
            im = bg
        else:
            im = im.convert("RGB")
        im.save(dst, "JPEG", quality=85, optimize=True, progressive=True)

    elif action == "opt_jpg":
        max_w = MAX_W_BANNER if ("banner" in str(src) or "og-image" in str(src)) else MAX_W_UPLOAD
        if w > max_w:
            im = im.convert("RGB").resize((max_w, int(h * max_w / w)), Image.LANCZOS)
        else:
            im = im.convert("RGB")
        im.save(src, "JPEG", quality=82, optimize=True, progressive=True)

    elif action == "opt_png":
        max_w = MAX_W_UPLOAD if "uploads" in str(src) else MAX_W_PUBLIC
        if w > max_w:
            im = im.resize((max_w, int(h * max_w / w)), Image.LANCZOS)
        # 大图且可能就是照片 → 量化 256 色（保留 alpha）
        if src.stat().st_size > 400_000 and w >= 800:
            im = im.convert("RGBA").quantize(colors=256, method=Image.FASTOCTREE,
                                             dither=Image.FLOYDSTEINBERG)
        im.save(src, "PNG", optimize=True)

    after = dst.stat().st_size if dst.exists() else src.stat().st_size
    return before, after


def update_db_refs(renames: dict):
    """renames: {old_relative_path: new_relative_path}，如 /uploads/a.png -> /uploads/a.jpg"""
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    tables = [r[0] for r in cur.execute(
        "SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
    total_rows = 0
    for t in tables:
        if t == "sqlite_sequence":
            continue
        cols = [r[1] for r in cur.execute(f"PRAGMA table_info({t})").fetchall()]
        for c in cols:
            for old, new in renames.items():
                cur.execute(
                    f"UPDATE {t} SET {c} = REPLACE({c}, ?, ?) WHERE {c} LIKE ?",
                    (old, new, f"%{old}%"))
                if cur.rowcount:
                    total_rows += cur.rowcount
    conn.commit()
    conn.close()
    return total_rows


def main():
    files, db_refs = collect_files()
    print(f"待分析文件: {len(files)} 个 (uploads 被引用 + public/images + og-image)")

    plans = []
    for path, is_upload in files:
        rel = "/" + str(path.relative_to(BASE))
        p = plan_for(path, is_upload)
        if p:
            action, dst, note = p
            if note:
                print(f"  [跳过] {rel}: {note}")
                continue
            plans.append((action, path, dst))

    est_before = sum(p[1].stat().st_size for p in plans)
    print(f"\n计划处理 {len(plans)} 个文件, 当前合计 {kb(est_before)}")
    for action, src, dst in plans:
        rel = "/" + str(src.relative_to(BASE))
        print(f"  [{action:10s}] {rel} ({kb(src.stat().st_size)})"
              + (f" -> {dst.name}" if action == 'png_to_jpg' else ""))

    if not APPLY:
        print("\n（dry-run，加 --apply 执行）")
        return

    # ---- 备份 ----
    bak_u = BACKEND / f"uploads-backup-{TS}"
    bak_p = BASE / f"public-backup-{TS}"
    if UPLOADS.exists():
        shutil.copytree(UPLOADS, bak_u)
    if (PUBLIC / "images").exists():
        shutil.copytree(PUBLIC / "images", bak_p / "images")
    if (PUBLIC / "og-image.png").exists():
        try:
            bak_p.mkdir(exist_ok=True)
        except Exception:
            pass
        shutil.copy2(PUBLIC / "og-image.png", bak_p / "og-image.png")
    print(f"\n已备份 uploads -> {bak_u.name}, public -> {bak_p.name}")

    # ---- 执行 ----
    renames = {}
    saved = 0
    count = 0
    for action, src, dst in plans:
        try:
            after = apply_action(action, src, dst)
            if after:
                before, after_size = after
                saved += before - after_size
                count += 1
                if action == "png_to_jpg":
                    # 数据库中的引用形态：uploads 文件是 /uploads/xxx，public 文件是 /images/xxx
                    if str(src.parent) == str(UPLOADS):
                        old_key, new_key = f"/uploads/{src.name}", f"/uploads/{dst.name}"
                    else:
                        old_key = "/" + str(src.relative_to(PUBLIC))
                        new_key = "/" + str(dst.relative_to(PUBLIC))
                    renames[old_key] = new_key
        except Exception as e:
            print(f"  [失败] {src.name}: {e}")

    # png_to_jpg 的文件在 DB 更新成功后再删源文件
    for old, new in renames.items():
        old_path = UPLOADS / old.replace("/uploads/", "") if old.startswith("/uploads/") else PUBLIC / old.lstrip("/")
        new_path = UPLOADS / new.replace("/uploads/", "") if new.startswith("/uploads/") else PUBLIC / new.lstrip("/")
        if old_path.exists() and new_path.exists():
            old_path.unlink()

    # ---- 同步 DB ----
    if renames:
        n = update_db_refs(renames)
        print(f"DB 引用更新: {len(renames)} 个路径重命名, {n} 处字段被更新")

    print(f"\n完成: 处理 {count} 个文件, 节省 {kb(saved)} ({saved/est_before*100:.0f}%)")
    print(f"备份目录: {bak_u.name} / {bak_p.name} (确认无误后可删除)")


if __name__ == "__main__":
    main()
