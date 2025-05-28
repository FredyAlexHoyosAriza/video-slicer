'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, updateClip, setCurrentClip } from '@/store/clipsSlice';
import { RootState } from '@/store/index';
import { Clip } from '@/types';

export default function ClipForm() {
  const dispatch = useDispatch();
  const currentClipId = useSelector((state: RootState) => state.clips.currentClipId);
  const clips = useSelector((state: RootState) => state.clips.clips);
  const clipToEdit = clips.find(c => c.id === currentClipId && c.id !== 'full-video');

  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (clipToEdit) {
      setName(clipToEdit.name);
      setStartTime(clipToEdit.startTime);
      setEndTime(clipToEdit.endTime);
    } else {
      resetForm();
    }
  }, [clipToEdit]);

  const resetForm = () => {
    setName('');
    setStartTime(0);
    setEndTime(0);
    dispatch(setCurrentClip('full-video'));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || startTime >= endTime) return;

    if (clipToEdit) {
      dispatch(updateClip({ ...clipToEdit, name, startTime, endTime }));
    } else {
      dispatch(addClip({ name, startTime, endTime }));
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={startTime}
        onChange={(e) => setStartTime(Number(e.target.value))}
        className="input"
        placeholder="Start Time (s)"
      />
      <input
        type="number"
        value={endTime}
        onChange={(e) => setEndTime(Number(e.target.value))}
        className="input"
        placeholder="End Time (s)"
      />
      <div className="flex gap-2">
        <button type="submit" className="btn">
          {clipToEdit ? 'Update Clip' : 'Add Clip'}
        </button>
        {clipToEdit && (
          <button type="button" className="btn-sm" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
