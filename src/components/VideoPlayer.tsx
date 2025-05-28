'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import { setFullVideoDuration } from '@/store/clipsSlice';
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

  return (
    <video
      ref={videoRef}
      controls
      src={`${VIDEO_URL}#t=${currentClip?.startTime},${currentClip?.endTime}`}
      className="w-full mb-4"
      onLoadedMetadata={onLoadedMetadata}
    />
  );
}
