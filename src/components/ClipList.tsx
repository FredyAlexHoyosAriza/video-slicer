'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import { deleteClip, setCurrentClip } from '@/store/clipsSlice';

export default function ClipList() {
  const clips = useSelector((state: RootState) => state.clips.clips);
  const dispatch = useDispatch();

  return (
    <ul className="space-y-2">
      {clips.map((clip) => (
        <li key={clip.id} className="p-2 border rounded">
          <div className="flex justify-between items-center">
            <span>{clip.name} ({clip.startTime}s - {clip.endTime}s)</span>
            <div className="space-x-2">
              <button onClick={() => dispatch(setCurrentClip(clip.id))} className="btn-sm">Play</button>
              {clip.id !== 'full-video' && (
                <button onClick={() => dispatch(deleteClip(clip.id))} className="btn-sm text-red-600">Delete</button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
