'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addClip } from '../store/clipsSlice';
import { AppDispatch } from '../store/index';

export default function ClipForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !start || !end) return;

    dispatch(
      addClip({
        id: uuidv4(),
        name,
        startTime: parseFloat(start),
        endTime: parseFloat(end),
      })
    );

    setName('');
    setStart('');
    setEnd('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Nombre del clip"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Tiempo de inicio (s)"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Tiempo de fin (s)"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Agregar Clip
      </button>
    </form>
  );
}
