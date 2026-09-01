'use client';

import { useState, useRef } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder?: string;
}

export default function MarkdownEditor({ value, onChange, label, placeholder }: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (syntax: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = value.slice(0, start);
    const selected = value.slice(start, end);
    const after = value.slice(end);

    let insertion = '';
    switch (syntax) {
      case 'bold': insertion = `**${selected || 'bold text'}**`; break;
      case 'italic': insertion = `*${selected || 'italic text'}*`; break;
      case 'h2': insertion = `\n## ${selected || 'Heading 2'}\n`; break;
      case 'h3': insertion = `\n### ${selected || 'Heading 3'}\n`; break;
      case 'link': insertion = `[${selected || 'link text'}](url)`; break;
      case 'list': insertion = selected
        ? selected.split('\n').map(l => `- ${l}`).join('\n')
        : '\n- item 1\n- item 2\n'; break;
      case 'image': insertion = `![${selected || 'alt text'}](url)`; break;
      case 'quote': insertion = selected
        ? selected.split('\n').map(l => `> ${l}`).join('\n')
        : `> ${selected || 'quote'}`; break;
    }
    const newVal = before + insertion + after;
    onChange(newVal);
    // Restore cursor position after onChange triggers re-render
    requestAnimationFrame(() => {
      ta.focus();
      const newPos = start + insertion.length;
      ta.setSelectionRange(newPos, newPos);
    });
  };

  const renderPreview = (md: string) => {
    return md.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-3" />;
      if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold mt-4 mb-1">{line.slice(4)}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold mt-5 mb-2">{line.slice(3)}</h2>;
      if (line.startsWith('# ')) return <h2 key={i} className="text-xl font-bold mt-5 mb-2">{line.slice(2)}</h2>;
      if (line.startsWith('> ')) return <blockquote key={i} className="border-l-3 border-blue-400 pl-3 py-0.5 my-1 text-slate-600 italic">{renderInline(line.slice(2))}</blockquote>;
      if (line.startsWith('- ')) return <li key={i} className="ml-4 text-sm text-slate-700">{renderInline(line.slice(2))}</li>;
      if (line.match(/^\d+\. /)) return <li key={i} className="ml-4 text-sm text-slate-700">{renderInline(line.replace(/^\d+\. /, ''))}</li>;
      if (line.startsWith('|')) return <pre key={i} className="bg-slate-800 text-green-400 rounded p-3 my-2 text-xs overflow-x-auto font-mono">{line}</pre>;
      return <p key={i} className="text-sm text-slate-700 my-0.5">{renderInline(line)}</p>;
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
      if (part.startsWith('![')) {
        const m = part.match(/!\[(.*?)\]\((.*?)\)/);
        if (m) return <img key={i} src={m[2]} alt={m[1]} className="max-w-full rounded my-2" />;
      }
      if (part.startsWith('[')) {
        const m = part.match(/\[(.*?)\]\((.*?)\)/);
        if (m) return <a key={i} href={m[2]} className="text-blue-600 underline" target="_blank" rel="noopener">{m[1]}</a>;
      }
      return part;
    });
  };

  const btnCls = 'px-2 py-1 text-xs font-medium rounded hover:bg-slate-200 transition-colors text-slate-600';

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Label + toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => insertMarkdown('bold')} className={btnCls} title="Bold (Ctrl+B)"><strong>B</strong></button>
          <button type="button" onClick={() => insertMarkdown('italic')} className={btnCls} title="Italic (Ctrl+I)"><em>I</em></button>
          <span className="w-px h-4 bg-slate-300 mx-0.5" />
          <button type="button" onClick={() => insertMarkdown('h2')} className={btnCls}>H2</button>
          <button type="button" onClick={() => insertMarkdown('h3')} className={btnCls}>H3</button>
          <span className="w-px h-4 bg-slate-300 mx-0.5" />
          <button type="button" onClick={() => insertMarkdown('link')} className={btnCls}>🔗</button>
          <button type="button" onClick={() => insertMarkdown('image')} className={btnCls}>🖼</button>
          <button type="button" onClick={() => insertMarkdown('list')} className={btnCls}>📋</button>
          <button type="button" onClick={() => insertMarkdown('quote')} className={btnCls}>💬</button>
          <span className="w-px h-4 bg-slate-300 mx-0.5" />
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${preview ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border hover:bg-slate-100'}`}
          >
            {preview ? '✏️ Edit' : '👁 Preview'}
          </button>
        </div>
      </div>
      {/* Content area */}
      {preview ? (
        <div className="p-4 min-h-[300px] bg-white">
          {value.trim() ? renderPreview(value) : <p className="text-slate-400 text-sm italic">Nothing to preview</p>}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || 'Write markdown...'}
          className="w-full min-h-[300px] px-4 py-3 text-sm font-mono border-none resize-y focus:outline-none focus:ring-0"
        />
      )}
    </div>
  );
}
