"use client";

import { useDispatch, useSelector } from "react-redux";
import { deleteClip, setCurrentClip, setEditForm } from "@/store/clipsSlice";
import { RootState } from "@/store/index";
import { RefObject } from "react";
import { VIDEO_URL } from '@/constants/video';

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function ClipList({ videoRef }: Props) {
  const dispatch = useDispatch();
  const { clips, currentClipId, editForm } = useSelector(
    (state: RootState) => state.clips
  );

  const handlePlay = (clipId: string, startTime: number) => {
    if (clipId === currentClipId) {
      if (videoRef.current) {
        const currentClip = clips.find((clip) => clip.id === currentClipId);
        videoRef.current.src = `${VIDEO_URL}#t=${currentClip?.startTime},${currentClip?.endTime}`;
        // videoRef.current.play();
      }
    } else {
      dispatch(setCurrentClip(clipId));
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">🎬 Clip List</h2>
      {clips
        // .filter((clip) => clip.id !== "full-video")
        .map((clip) => (
          <div
            key={clip.id}
            className={`p-2 border rounded flex justify-between items-center ${
              currentClipId === clip.id ? "bg-blue-100" : ""
            }`}
          >
            <div>
              <div className="font-medium">{clip.name}</div>
              <div className="text-sm text-gray-600">
                {clip.startTime}s - {clip.endTime}s
              </div>
            </div>
            <div className="flex gap-2">
              {/* <button
                className="btn-sm"
                onClick={() => dispatch(setCurrentClip(clip.id))}
              >
                Play
              </button> */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay(clip.id, clip.startTime);
                }}
                className="btn-sm"
              >
                Play
              </button>
              {clip.id !== "full-video" && (
                <>
                  <button
                    className="btn-sm"
                    onClick={() => {
                      if (editForm) dispatch(setEditForm(false));//Cancel
                      else {//Edit
                        dispatch(setEditForm(true));
                        if (currentClipId !== clip.id)
                          dispatch(setCurrentClip(clip.id));
                      }
                      // Aquí no es necesario cambiar nada más: el formulario sabrá que estamos editando
                    }}
                  >
                    {`${editForm ? "Cancel" : "Edit"}`}
                  </button>
                  <button
                    className="btn-sm text-red-600"
                    onClick={() => dispatch(deleteClip(clip.id))}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
