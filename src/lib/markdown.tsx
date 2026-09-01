import type {ReactNode} from 'react';

/**
 * 共享 Markdown 渲染器。
 * 支持：标题(#/##/###)、无序/有序列表、表格、粗体(**text** 与 <strong>)、斜体(*text*)、
 * 链接 [text](url)、图片 ![alt](url)、引用 > text。
 * 产品详情页与博客详情页共用。
 */

// 行内渲染：<strong> HTML、**粗体**、*斜体*、链接、图片
export function renderInline(text: string): ReactNode[] {
  const parts = text.split(
    /(<strong>.*?<\/strong>|\*\*[^*]+\*\*|\*[^*]+\*|!\[[^\]]*\]\([^)]+\)|\[[^\]]*\]\([^)]+\))/g
  );
  return parts.map((part, i) => {
    if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
      return <strong key={i} className="font-bold">{part.slice(8, -9)}</strong>;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const imgMatch = part.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      return <img key={i} src={imgMatch[2]} alt={imgMatch[1]} className="max-w-full rounded-lg my-4" />;
    }
    const linkMatch = part.match(/\[([^\]]*)\]\(([^)]+)\)/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export function renderMarkdown(content: string | undefined): ReactNode[] | null {
  if (!content) return null;
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let tableRows: string[][] = [];

  const flushList = (key: string) => {
    if (listItems.length === 0) return;
    if (listType === 'ol') {
      elements.push(<ol key={key} className="list-decimal ml-6 mb-3 space-y-1 text-slate-600">{listItems}</ol>);
    } else {
      elements.push(<ul key={key} className="list-disc ml-6 mb-3 space-y-1 text-slate-600">{listItems}</ul>);
    }
    listItems = [];
    listType = null;
  };

  const flushTable = (key: string) => {
    if (tableRows.length === 0) return;
    elements.push(
      <div key={key} className="overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {tableRows[0].map((cell, ci) => (
                <th key={ci} className="border border-slate-300 px-3 py-2 bg-slate-100 font-semibold text-slate-700 text-left">
                  {renderInline(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(1).map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className="border border-slate-300 px-3 py-2 text-slate-600">{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(`list-${i}`);
      flushTable(`table-${i}`);
      elements.push(<div key={i} className="h-3" />);
      return;
    }
    if (trimmed.startsWith('> ')) {
      flushList(`list-${i}`);
      flushTable(`table-${i}`);
      elements.push(
        <blockquote key={i} className="border-l-4 border-blue-400 pl-4 py-1 my-2 text-slate-600 italic bg-blue-50/50 rounded-r">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }
    if (trimmed.startsWith('## ')) {
      flushList(`list-${i}`);
      flushTable(`table-${i}`);
      elements.push(<h2 key={i} className="text-xl font-bold text-slate-900 mt-10 mb-4">{renderInline(trimmed.slice(3))}</h2>);
      return;
    }
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList(`list-${i}`);
      const cells = trimmed.slice(1, -1).split('|').map(c => c.trim());
      if (cells.every(c => /^:?-{2,}:?$/.test(c))) return; // 跳过 |---|---| 分隔行
      tableRows.push(cells);
      return;
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushTable(`table-${i}`);
      if (listType && listType !== 'ul') flushList(`list-${i}`);
      listType = 'ul';
      listItems.push(<li key={i}>{renderInline(trimmed.slice(2))}</li>);
      return;
    }
    if (/^\d+\./.test(trimmed)) {
      flushTable(`table-${i}`);
      if (listType && listType !== 'ol') flushList(`list-${i}`);
      listType = 'ol';
      listItems.push(<li key={i}>{renderInline(trimmed.replace(/^\d+\.\s*/, ''))}</li>);
      return;
    }
    if (trimmed.startsWith('#')) {
      flushList(`list-${i}`);
      flushTable(`table-${i}`);
      const level = trimmed.match(/^#+/)?.[0].length || 1;
      const text = trimmed.replace(/^#+\s*/, '');
      const sizes: Record<number, string> = {1: 'text-2xl', 2: 'text-xl', 3: 'text-lg'};
      elements.push(<h3 key={i} className={`${sizes[level] || 'text-lg'} font-bold text-slate-900 mt-8 mb-3`}>{renderInline(text)}</h3>);
      return;
    }
    flushList(`list-${i}`);
    flushTable(`table-${i}`);
    elements.push(<p key={i} className="text-slate-600 leading-relaxed mb-3">{renderInline(trimmed)}</p>);
  });

  flushList('list-final');
  flushTable('table-final');
  return elements;
}
