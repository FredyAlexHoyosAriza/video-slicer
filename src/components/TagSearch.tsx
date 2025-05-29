'use client';

import { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TagSearch({ value, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="input"
        placeholder="Buscar por etiqueta..."
      />
    </div>
  );
}
