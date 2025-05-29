'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function usePersistClips() {
  const clips = useSelector((state: RootState) => state.clips.clips);

  useEffect(() => {
    localStorage.setItem('clips', JSON.stringify(clips));
  }, [clips]);
}
