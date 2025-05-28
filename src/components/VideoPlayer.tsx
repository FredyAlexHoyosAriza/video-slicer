'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import { setFullVideoDuration, setCurrentClip } from '@/store/clipsSlice';
import { RefObject } from 'react';
import { VIDEO_URL } from '@/constants/video';

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
}


// const VIDEO_URL = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

export default function VideoPlayer({ videoRef }: Props) {
  // const videoRef = useRef<HTMLVideoElement>(null);
  const { clips, currentClipId } = useSelector((state: RootState) => state.clips);
  const dispatch = useDispatch();
  const currentClip = clips.find((clip) => clip.id === currentClipId);

  useEffect(() => {
    if (videoRef.current && currentClip) {
      videoRef.current.currentTime = currentClip.startTime; 
    }
  }, [currentClipId]);

  const onLoadedMetadata = () => {
    if (videoRef.current) {
      dispatch(setFullVideoDuration(videoRef.current.duration));
      videoRef.current.play();
    }
  };

  const onTimeUpdate = () => {
  if (!videoRef.current || !currentClip || currentClip.id === 'full-video') return;

  const current = videoRef.current.currentTime;

  if (current >= currentClip.endTime) {
    videoRef.current.pause(); // Asegúrate de detener el video justo en el límite

    // Evita múltiples ejecuciones con una bandera local o condición
    if (!videoRef.current.dataset.finished) {
      videoRef.current.dataset.finished = 'true';

      setTimeout(() => {
        const index = clips.findIndex((c) => c.id === currentClip.id);
        const next = clips[index + 1];
        if (next) {
          videoRef.current!.dataset.finished = '';
          dispatch(setCurrentClip(next.id));
        }
      }, 3000);
    }
  }
};


  return (
    <video
      key={currentClip?.id}
      ref={videoRef}
      controls
      src={`${VIDEO_URL}#t=${currentClip?.startTime},${currentClip?.endTime}`}
      className="w-full mb-4"
      onLoadedMetadata={onLoadedMetadata}
      onTimeUpdate={onTimeUpdate} //
    />
  );
}
