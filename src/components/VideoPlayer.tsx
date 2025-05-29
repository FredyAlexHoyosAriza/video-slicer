'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import { setFullVideoDuration, setCurrentClip } from '@/store/clipsSlice';
import { RefObject } from 'react';
import { RingLoader } from 'react-spinners';
import { VIDEO_URL } from '@/constants/video';

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function VideoPlayer({ videoRef }: Props) {
  const { clips, currentClipId, editForm } = useSelector((state: RootState) => state.clips);
  const dispatch = useDispatch();
  const currentClip = clips.find((clip) => clip.id === currentClipId);
  const [isWaiting, setIsWaiting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (videoRef.current && currentClip) {
      videoRef.current.currentTime = currentClip.startTime;
      videoRef.current.dataset.finished = '';
      setIsWaiting(false);
      setCountdown(null);
    }
  }, [currentClipId, currentClip, videoRef]);

  const onLoadedMetadata = () => {
    if (videoRef.current) {
      dispatch(setFullVideoDuration(videoRef.current.duration));
      videoRef.current.play();
    }
  };

  const onTimeUpdate = () => {
    if (!videoRef.current || !currentClip || currentClip.id === 'full-video' || editForm) return;

    const current = videoRef.current.currentTime;

    if (current >= currentClip.endTime) {
      videoRef.current.pause();

      if (!videoRef.current.dataset.finished) {
        videoRef.current.dataset.finished = 'true';

        const index = clips.findIndex((c) => c.id === currentClip.id);
        const next = clips[index + 1];

        if (next) {
          setIsWaiting(true);
          setCountdown(3);

          let secondsLeft = 3;
          const interval = setInterval(() => {
            secondsLeft -= 1;
            setCountdown(secondsLeft);

            if (secondsLeft === 0) {
              clearInterval(interval);
              setIsWaiting(false);
              setCountdown(null);
              dispatch(setCurrentClip(next.id));
            }
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="relative">
      <video
        key={currentClip?.id}
        ref={videoRef}
        controls
        src={`${VIDEO_URL}#t=${currentClip?.startTime},${currentClip?.endTime}`}
        className="w-full mb-4"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
      />
      {isWaiting && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10 space-y-2">
          <RingLoader color="#ffffff" />
          <p className="text-white text-lg font-semibold">
            Siguiente clip en {countdown}...
          </p>
        </div>
      )}
    </div>
  );
}
