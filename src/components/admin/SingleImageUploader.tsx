'use client';

import { useState, useRef } from 'react';

interface SingleImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  token: string;
}

export default function SingleImageUploader({ value, onChange, token }: SingleImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError(data.error || 'Upload failed');
    } catch {
      setError('Upload failed');
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <div className="flex items-start gap-3">
        {value ? (
          <div className="relative group w-32 shrink-0">
            <img
              src={value}
              alt="Cover"
              className="w-32 h-24 object-cover rounded border"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className="w-32 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400 shrink-0"
          >
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="px-3 py-1.5 text-xs border border-gray-300 rounded bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          <div className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WebP up to 10MB</div>
        </div>
      </div>
      {value && (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="mt-2 w-full border rounded px-3 py-2 text-sm font-mono"
          placeholder="Or paste URL directly"
        />
      )}
    </div>
  );
}