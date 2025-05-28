// src/components/ClipList.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import { deleteClip, setCurrentClip } from '@/store/clipsSlice';
import { RefObject } from 'react';

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function ClipList({ videoRef }: Props) {
  const { clips, currentClipId } = useSelector((state: RootState) => state.clips);
  const dispatch = useDispatch();

  const handlePlay = (clipId: string, startTime: number) => {
    dispatch(setCurrentClip(clipId));
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  };

  return (
    <ul className="space-y-2">
      {clips.map((clip) => {
        const isSelected = clip.id === currentClipId;

        return (
          <li
            key={clip.id}
            onClick={() => dispatch(setCurrentClip(clip.id))}
            className={`p-2 border rounded cursor-pointer ${isSelected ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-100'}`}
          >
            <div className="flex justify-between items-center">
              <span>
                {clip.name} ({clip.startTime}s - {clip.endTime}s)
              </span>
              <div className="space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(clip.id, clip.startTime);
                  }}
                  className="btn-sm"
                >
                  Play
                </button>
                {clip.id !== 'full-video' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteClip(clip.id));
                    }}
                    className="btn-sm text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
