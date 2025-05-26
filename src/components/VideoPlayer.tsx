'use client';

import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const clips = useSelector((state: RootState) => state.clips.clips);

  useEffect(() => {
    if (videoRef.current) {
      // Lógica para manejar la reproducción de clips
    }
  }, [clips]);

  return (
    <video ref={videoRef} controls className="w-full">
      <source src="https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4" type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>
  );
}
