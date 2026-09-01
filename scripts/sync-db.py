#!/usr/bin/env python3
"""
sync-db.py — Incremental DB sync from local SQLite to remote server via Admin API.

Usage:
  python3 scripts/sync-db.py                          # dry-run all tables
  python3 scripts/sync-db.py --execute                 # write all tables
  python3 scripts/sync-db.py --table products          # dry-run products only
  python3 scripts/sync-db.py --table products,site-config --execute

Env vars (optional):
  ANGU_API_URL       default: https://www.angumesh.com
  ANGU_ADMIN_USER    default: admin
  ANGU_ADMIN_PASS    default: admin123
"""

import argparse, json, os, sys, sqlite3, time
import requests

# ── Table → API mapping ──
TABLE_CONFIG = {
    "products":                {"endpoint": "products",                "pk": "id"},
    "product-categories":      {"endpoint": "product-categories",      "pk": "id"},
    "blog-posts":              {"endpoint": "blog-posts",              "pk": "id"},
    "blog-categories":         {"endpoint": "blog-categories",         "pk": "id"},
    "site-config":             {"endpoint": "site-config",             "batch": "upsert"},
    "banners":                 {"endpoint": "banners",                 "pk": "id"},
    "why-choose-us":           {"endpoint": "why-choose-us",           "pk": "id"},
    "application-scenarios":   {"endpoint": "application-scenarios",   "pk": "id"},
    "about-timeline":          {"endpoint": "about-timeline",          "pk": "id"},
    "about-team":              {"endpoint": "about-team",              "pk": "id"},
    "about-factory-images":    {"endpoint": "about-factory-images",    "pk": "id"},
    "about-certifications":    {"endpoint": "about-certifications",    "pk": "id"},
}

SKIP_FIELDS = {"id", "created_at", "updated_at"}


class SyncEngine:
    def __init__(self, base_url: str, user: str, password: str, db_path: str, dry_run: bool):
        self.base_url = base_url.rstrip("/")
        self.user = user
        self.password = password
        self.db_path = db_path
        self.dry_run = dry_run
        self.session = requests.Session()
        self.session.headers.update({"Content-Type": "application/json"})
        self.local_conn = sqlite3.connect(db_path)
        self.local_conn.row_factory = sqlite3.Row
        self._login()

    def _login(self):
        resp = self.session.post(
            f"{self.base_url}/api/admin/login",
            json={"username": self.user, "password": self.password},
            timeout=15,
        )
        resp.raise_for_status()
        token = resp.json()["token"]
        self.session.headers.update({"Authorization": f"Bearer {token}"})
        print(f"  ✓ Logged in as {self.user}")

    def close(self):
        self.local_conn.close()
        self.session.close()

    def _get_remote(self, endpoint: str) -> list:
        resp = self.session.get(f"{self.base_url}/api/admin/{endpoint}", timeout=30)
        if resp.status_code == 404:
            return []
        resp.raise_for_status()
        data = resp.json()
        if isinstance(data, list):
            return data
        # unwrap common envelope keys
        for key in ("products", "categories", "banners", endpoint.replace("-", "_")):
            if key in data and isinstance(data[key], list):
                return data[key]
        return []

    def _row_to_payload(self, row: dict) -> dict:
        payload = {}
        for key, value in dict(row).items():
            if key in SKIP_FIELDS:
                continue
            if key in ("images", "specifications_en", "specifications_zh",
                        "applications_en", "applications_zh", "faq_en", "faq_zh"):
                if isinstance(value, str):
                    try:
                        payload[key] = json.loads(value)
                    except (json.JSONDecodeError, TypeError):
                        payload[key] = value
                else:
                    payload[key] = value
            else:
                payload[key] = value
        return payload

    def sync_products(self):
        local = self.local_conn.execute("SELECT * FROM products ORDER BY id").fetchall()
        remote = self._get_remote("products")
        remote_by_id = {r["id"]: r for r in remote if r.get("id")}

        created, updated, skipped = 0, 0, 0
        for row in local:
            payload = self._row_to_payload(row)
            rid = row["id"]
            label = f"{row['name_en'][:50]}"
            if rid in remote_by_id:
                print(f"  PUT  products/{rid}  ← {label}")
                if not self.dry_run:
                    resp = self.session.put(
                        f"{self.base_url}/api/admin/products/{rid}", json=payload, timeout=30
                    )
                    if resp.ok:
                        updated += 1
                    else:
                        print(f"    ❌ {resp.status_code}: {resp.text[:200]}")
                        skipped += 1
            else:
                print(f"  POST products  ← {label} (NEW)")
                if not self.dry_run:
                    resp = self.session.post(
                        f"{self.base_url}/api/admin/products", json=payload, timeout=30
                    )
                    if resp.ok:
                        created += 1
                    else:
                        print(f"    ❌ {resp.status_code}: {resp.text[:200]}")
                        skipped += 1

        print(f"  Products: {created} created, {updated} updated, {skipped} skipped "
              f"({'DRY RUN' if self.dry_run else 'EXECUTED'})")

    def sync_site_config(self):
        rows = self.local_conn.execute(
            "SELECT key, value_en, value_zh FROM site_config ORDER BY key"
        ).fetchall()
        payload = {r["key"]: {"en": r["value_en"] or "", "zh": r["value_zh"] or ""} for r in rows}

        print(f"  PUT  site-config  ← {len(payload)} keys")
        if not self.dry_run:
            resp = self.session.put(
                f"{self.base_url}/api/admin/site-config", json=payload, timeout=30
            )
            if resp.ok:
                print(f"    ✓ {resp.json().get('message', 'OK')}")
            else:
                print(f"    ❌ {resp.status_code}: {resp.text[:200]}")

    def sync_generic(self, table: str):
        cfg = TABLE_CONFIG[table]
        endpoint = cfg["endpoint"]
        pk = cfg.get("pk", "id")
        local = self.local_conn.execute(
            f"SELECT * FROM `{table}` ORDER BY {pk}"
        ).fetchall()
        if not local:
            print(f"  {table}: no local data")
            return

        remote = self._get_remote(endpoint)
        remote_by_id = {r["id"]: r for r in remote if r.get("id")}

        created, updated, skipped = 0, 0, 0
        for row in local:
            payload = self._row_to_payload(row)
            rid = row["id"]
            label = f"id={rid} {row.get('slug', row.get('key', '') or '' )}"
            if rid in remote_by_id:
                print(f"  PUT  {endpoint}/{rid}  ← {label}")
                if not self.dry_run:
                    resp = self.session.put(
                        f"{self.base_url}/api/admin/{endpoint}/{rid}", json=payload, timeout=30
                    )
                    if resp.ok:
                        updated += 1
                    else:
                        print(f"    ❌ {resp.status_code}: {resp.text[:200]}")
                        skipped += 1
            else:
                print(f"  POST {endpoint}  ← {label} (NEW)")
                if not self.dry_run:
                    resp = self.session.post(
                        f"{self.base_url}/api/admin/{endpoint}", json=payload, timeout=30
                    )
                    if resp.ok:
                        created += 1
                    else:
                        print(f"    ❌ {resp.status_code}: {resp.text[:200]}")
                        skipped += 1

        print(f"  {table}: {created} created, {updated} updated, {skipped} skipped "
              f"({'DRY RUN' if self.dry_run else 'EXECUTED'})")

    def run(self, tables: list):
        label = "🔍 DRY RUN" if self.dry_run else "⚡ EXECUTING"
        print(f"\n{label} — syncing to {self.base_url}")
        print(f"  Tables: {', '.join(tables)}\n")

        for table in tables:
            print(f"── {table} ──")
            if table == "products":
                self.sync_products()
            elif table == "site-config":
                self.sync_site_config()
            else:
                self.sync_generic(table)

        if self.dry_run:
            print(f"\n🔍 Dry run complete. Add --execute to apply changes.")
        else:
            print(f"\n✅ Sync complete.")


def main():
    parser = argparse.ArgumentParser(description="Sync local SQLite to remote Angu admin API")
    parser.add_argument("--execute", action="store_true", help="Write to remote (default: dry-run)")
    parser.add_argument("--table", default="all",
                        help="Comma-separated tables or 'all' (default: all)")
    parser.add_argument("--base-url",
                        default=os.environ.get("ANGU_API_URL", "https://www.angumesh.com"),
                        help="Remote API base URL")
    parser.add_argument("--user",
                        default=os.environ.get("ANGU_ADMIN_USER", "admin"),
                        help="Admin username")
    parser.add_argument("--pass", dest="password",
                        default=os.environ.get("ANGU_ADMIN_PASS", "admin123"),
                        help="Admin password")
    args = parser.parse_args()

    # Resolve tables
    if args.table == "all":
        tables = list(TABLE_CONFIG.keys())
    else:
        tables = [t.strip() for t in args.table.split(",")]
        for t in tables:
            if t not in TABLE_CONFIG:
                print(f"❌ Unknown table: {t}")
                print(f"   Available: {', '.join(TABLE_CONFIG.keys())}")
                sys.exit(1)

    db_path = os.path.join(os.path.dirname(__file__), "..", "backend", "inquiries.db")
    if not os.path.exists(db_path):
        print(f"❌ DB not found: {db_path}")
        sys.exit(1)

    engine = SyncEngine(
        base_url=args.base_url,
        user=args.user,
        password=args.password,
        db_path=db_path,
        dry_run=not args.execute,
    )
    try:
        engine.run(tables)
    except requests.ConnectionError:
        print(f"\n❌ Cannot connect to {args.base_url}")
        sys.exit(1)
    except requests.HTTPError as e:
        print(f"\n❌ HTTP error: {e}")
        sys.exit(1)
    finally:
        engine.close()


if __name__ == "__main__":
    main()
