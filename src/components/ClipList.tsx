'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/index';
import { deleteClip } from '../store/clipsSlice';

export default function ClipList() {
  const clips = useSelector((state: RootState) => state.clips.clips);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ul className="space-y-4">
      {clips.map((clip) => (
        <li key={clip.id} className="border p-4 rounded shadow">
          <p className="font-bold">{clip.name}</p>
          <p>
            {clip.startTime}s - {clip.endTime}s
          </p>
          <button
            onClick={() => dispatch(deleteClip(clip.id))}
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
