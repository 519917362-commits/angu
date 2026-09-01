'use client';

import { useState, useRef } from 'react';

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  token: string;
  max?: number;
}

export default function ImageUploader({ value, onChange, token, max = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [urlMode, setUrlMode] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── File upload ──
  const handleFiles = async (files: FileList) => {
    if (value.length >= max) {
      setError(`最多 ${max} 张图片`); return;
    }
    setError('');
    setUploading(true);

    for (const file of Array.from(files)) {
      if (value.length >= max) break;
      const fd = new FormData();
      fd.append('image', file);
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        const data = await res.json();
        if (data.url) onChange([...value, data.url]);
        else setError(data.error || 'Upload failed');
      } catch {
        setError('Upload failed');
      }
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // ── Add URL ──
  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (value.length >= max) {
      setError(`最多 ${max} 张图片`); return;
    }
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(trimmed)) {
      setError('请输入有效的图片 URL（支持 jpg/png/gif/webp/svg）');
      return;
    }
    onChange([...value, trimmed]);
    setUrlInput('');
    setError('');
  };

  // ── Remove ──
  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    if (previewIndex === index) setPreviewIndex(null);
  };

  // ── Drag-to-reorder ──
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropReorder = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === toIndex) return;
    const next = [...value];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(toIndex, 0, moved);
    onChange(next);
    setDragIndex(null);
  };

  // ── Keyboard nav for lightbox ──
  const lightboxPrev = () => {
    if (previewIndex === null) return;
    setPreviewIndex(previewIndex > 0 ? previewIndex - 1 : value.length - 1);
  };
  const lightboxNext = () => {
    if (previewIndex === null) return;
    setPreviewIndex(previewIndex < value.length - 1 ? previewIndex + 1 : 0);
  };

  // Keyboard listener for lightbox
  if (typeof window !== 'undefined' && previewIndex !== null) {
    // Using useEffect would be cleaner but inline works for simplicity
    // We'll handle via onKeyDown on the lightbox div instead
  }

  return (
    <div>
      {/* Upload zone */}
      <div className="flex gap-2 mb-3">
        {/* File upload drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex-1 border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => e.target.files && handleFiles(e.target.files)}
          />
          {uploading ? (
            <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading...
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              <span className="text-blue-600 font-medium">点击上传</span> 或拖拽图片
              <div className="text-xs text-gray-400 mt-0.5">JPG / PNG / GIF / WebP</div>
            </div>
          )}
        </div>

        {/* Toggle URL input */}
        <button
          type="button"
          onClick={e => { e.stopPropagation(); setUrlMode(!urlMode); }}
          className={`px-3 text-xs rounded border transition-colors whitespace-nowrap ${
            urlMode ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-500 hover:border-gray-400'
          }`}
        >
          {urlMode ? '✕ URL' : '+ URL'}
        </button>
      </div>

      {/* URL paste input */}
      {urlMode && (
        <div className="flex gap-2 mb-3">
          <input
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addUrl(); } }}
            placeholder="粘贴图片链接 https://..."
            className="flex-1 border rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 font-medium"
          >
            添加
          </button>
        </div>
      )}

      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}

      {/* Image grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {value.map((url, i) => (
            <div
              key={`${url}-${i}`}
              draggable
              onDragStart={e => handleDragStart(e, i)}
              onDragOver={e => handleDragOver(e, i)}
              onDrop={e => handleDropReorder(e, i)}
              onDragEnd={() => setDragIndex(null)}
              className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing ${
                dragIndex === i ? 'opacity-40 border-blue-400' : 'border-transparent hover:border-blue-300'
              }`}
            >
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-28 object-cover"
                onClick={() => setPreviewIndex(i)}
                onError={e => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="112" fill="%23f3f4f6"><rect width="150" height="112"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="%239ca3af" font-size="12">Broken</text></svg>'; }}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setPreviewIndex(i); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-white/90 text-gray-700 hover:bg-white shadow"
                  title="预览"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>

              {/* Index badge + primary indicator */}
              <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                <span className="bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                  {i + 1}
                </span>
                {i === 0 && (
                  <span className="bg-blue-500 text-white text-[10px] px-1 py-0.5 rounded font-medium">
                    主图
                  </span>
                )}
              </div>

              {/* Delete button */}
              <button
                type="button"
                onClick={e => { e.stopPropagation(); removeImage(i); }}
                className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="删除"
              >
                ×
              </button>

              {/* Drag handle hint */}
              <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-60 transition-opacity">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 3h2v2H9V3zm4 0h2v2h-2V3zM9 11h2v2H9v-2zm4 0h2v2h-2v-2zM9 7h2v2H9V7zm4 0h2v2h-2V7zm-4 8h2v2H9v-2zm4 0h2v2h-2v-2z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {value.length === 0 && (
        <div className="text-xs text-gray-400 italic py-2">暂无图片 — 上传或粘贴图片链接</div>
      )}

      {/* Info bar */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-400">
          {value.length}/{max} · 拖拽可排序 · 第一张为主图
        </div>
        {value.length > 1 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs text-red-400 hover:text-red-600"
          >
            清空全部
          </button>
        )}
      </div>

      {/* ── Lightbox ── */}
      {previewIndex !== null && value[previewIndex] && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center"
          onClick={() => setPreviewIndex(null)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setPreviewIndex(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 text-xl transition-colors"
          >
            ×
          </button>

          {/* Prev */}
          {value.length > 1 && (
            <button
              type="button"
              onClick={e => { e.stopPropagation(); lightboxPrev(); }}
              className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <img
            src={value[previewIndex]}
            alt={`Preview ${previewIndex + 1}`}
            className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />

          {/* Next */}
          {value.length > 1 && (
            <button
              type="button"
              onClick={e => { e.stopPropagation(); lightboxNext(); }}
              className="absolute right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            {previewIndex + 1} / {value.length}
          </div>
        </div>
      )}
    </div>
  );
}
