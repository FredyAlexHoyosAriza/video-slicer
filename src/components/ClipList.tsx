"use client";

import { useDispatch, useSelector } from "react-redux";
import { deleteClip, setCurrentClip, setEditForm } from "@/store/clipsSlice";
import { RootState } from "@/store/index";
import { RefObject } from "react";
import { Clip } from "@/types/index";
import { VIDEO_URL } from "@/constants/video";

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>;
  clips: Clip[];
}

export default function ClipList({ videoRef, clips }: Props) {
  const dispatch = useDispatch();
  const { currentClipId, editForm } = useSelector(
    (state: RootState) => state.clips
  );

  const handlePlay = (clipId: string, startTime: number) => {
    if (clipId === currentClipId) {
      const currentClip = clips.find((clip) => clip.id === currentClipId);
      if (videoRef.current && currentClip) {
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
              {/* Mostrar etiquetas */}
              <div className="flex flex-wrap gap-1 mt-1">
                {clip.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
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
                      if (editForm) dispatch(setEditForm(false)); //Cancel
                      else {
                        //Edit
                        dispatch(setEditForm(true));
                        if (currentClipId !== clip.id)
                          dispatch(setCurrentClip(clip.id));
                      }
                      // Aquí no es necesario cambiar nada más: el formulario sabrá que estamos editando
                    }}
                  >
                    {`${editForm && currentClipId === clip.id ? "Cancel" : "Edit"}`}
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
