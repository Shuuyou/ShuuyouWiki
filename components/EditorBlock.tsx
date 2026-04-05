import type { CSSProperties, ReactNode } from 'react';

type EditorBlockTone = 'plain' | 'note' | 'warn';

interface EditorBlockProps {
  width?: number;
  tone?: EditorBlockTone;
  children: ReactNode;
}

const toneStyles: Record<EditorBlockTone, CSSProperties> = {
  plain: {
    border: '1px solid currentColor',
    background: 'transparent',
  },
  note: {
    border: '1px solid currentColor',
    background: 'color-mix(in oklab, currentColor 8%, transparent)',
  },
  warn: {
    border: '2px solid currentColor',
    background: 'color-mix(in oklab, currentColor 12%, transparent)',
  },
};

export function EditorBlock({ width = 100, tone = 'plain', children }: EditorBlockProps) {
  const clamped = Math.max(30, Math.min(100, width));

  return (
    <div
      style={{
        width: `${clamped}%`,
        padding: '1rem',
        margin: '1rem 0',
        borderRadius: 0,
        ...toneStyles[tone],
      }}
    >
      {children}
    </div>
  );
}
