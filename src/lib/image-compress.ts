/**
 * 上传前客户端图片压缩
 * - 超过 MAX_DIM 边长或文件过大的图片，先用 canvas 缩放/重编码再上传
 * - 照片类 → JPEG q0.85；带透明通道的 PNG → 保留 PNG（缩放后重编码）
 * - SVG / GIF（动图）原样上传
 */

const MAX_DIM = 1600;        // 最长边像素上限
const SIZE_THRESHOLD = 200 * 1024; // 超过 200KB 才处理，小图免编译损耗

function hasRealTransparency(ctx: CanvasRenderingContext2D, w: number, h: number): boolean {
  try {
    const data = ctx.getImageData(0, 0, w, h).data;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 250) return true;
    }
  } catch {
    return false; // 跨域污染等情况按不透明处理
  }
  return false;
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('decode failed'));
      img.src = url;
    });
  } finally {
    // 给解码留一帧时间后再回收
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('encode failed'))),
      type,
      quality,
    );
  });
}

/**
 * 压缩单张图片；不适用时返回原文件
 */
export async function compressImage(file: File): Promise<File> {
  // SVG / GIF 不动；非图片类型不动
  if (!file.type.startsWith('image/')) return file;
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file;
  if (file.size <= SIZE_THRESHOLD) return file;

  try {
    const img = await loadImage(file);
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return file;

    const scale = Math.min(1, MAX_DIM / Math.max(w, h));
    const cw = Math.round(w * scale);
    const ch = Math.round(h * scale);

    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, cw, ch);

    // PNG 且有真实透明 → 保留 PNG；其余 → JPEG
    const keepPng = file.type === 'image/png' && hasRealTransparency(ctx, cw, ch);
    let blob: Blob;
    let name = file.name;
    if (keepPng) {
      blob = await canvasToBlob(canvas, 'image/png');
    } else {
      blob = await canvasToBlob(canvas, 'image/jpeg', 0.85);
      name = file.name.replace(/\.png$/i, '.jpg');
    }

    // 压缩后反而更大（极少见）→ 用原文件
    if (blob.size >= file.size) return file;
    return new File([blob], name, { type: blob.type, lastModified: Date.now() });
  } catch {
    return file; // 任何失败都退回原文件，不阻塞上传
  }
}
