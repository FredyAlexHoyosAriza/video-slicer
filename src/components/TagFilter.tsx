'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}

export default function TagFilter({ selectedTag, onSelect }: Props) {
  const clips = useSelector((state: RootState) => state.clips.clips);
  const rawTags = clips.flatMap(c => c.tags || []);
  const tags = Array.from(new Set(rawTags.filter(Boolean))); // 🔒 Limpieza extra

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onSelect(null)}
        className={`btn-sm ${selectedTag === null ? 'bg-blue-300' : ''}`}
      >
        All
      </button>

      {tags.map(tag => (
        <button
          key={`tag-${tag}`} // ✅ Clave estable y única
          onClick={() => onSelect(tag)}
          className={`btn-sm ${tag === selectedTag ? 'bg-blue-300' : ''}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
