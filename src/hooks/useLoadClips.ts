'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadClipsFromStorage } from '@/store/clipsSlice';
import { Clip } from '@/types';

export function useLoadClips() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('clips');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Clip[];
        dispatch(loadClipsFromStorage(parsed));
      } catch (err) {
        console.error('Error loading clips from localStorage:', err);
      }
    }
  }, []);
}
