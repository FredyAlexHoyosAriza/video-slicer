'use client';

import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClip } from '@/store/clipsSlice';

export default function ClipForm() {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && startTime < endTime) {
      dispatch(addClip({ name, startTime, endTime }));
      setName('');
      setStartTime(0);
      setEndTime(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Name" required />
      <input type="number" value={startTime} onChange={(e) => setStartTime(Number(e.target.value))} className="input" placeholder="Start Time (s)" />
      <input type="number" value={endTime} onChange={(e) => setEndTime(Number(e.target.value))} className="input" placeholder="End Time (s)" />
      <button type="submit" className="btn">Add Clip</button>
    </form>
  );
}
