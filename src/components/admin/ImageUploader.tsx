'use client';

import { useState, useRef } from 'react';

interface ImageUploaderProps {
  value: string[];           // existing image URLs
  onChange: (urls: string[]) => void;
  token: string;
  max?: number;
}

export default function ImageUploader({ value, onChange, token, max = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    if (value.length >= max) {
      setError(`Max ${max} images`); return;
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
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors mb-3
          ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
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
          <div className="text-sm text-gray-500">Uploading...</div>
        ) : (
          <div className="text-sm text-gray-500">
            <span className="text-blue-600 font-medium">Click to upload</span>
            {' '}or drag & drop
            <div className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WebP up to 10MB</div>
          </div>
        )}
      </div>

      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}

      {/* Existing images */}
      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {value.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-20 object-cover rounded border"
                onError={e => (e.currentTarget.src = 'https://via.placeholder.com/150?text=Error')}
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded truncate max-w-full">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}