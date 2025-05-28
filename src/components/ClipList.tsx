"use client";

import { useDispatch, useSelector } from "react-redux";
import { deleteClip, setCurrentClip } from "@/store/clipsSlice";
import { RootState } from "@/store/index";

export default function ClipList() {
  const dispatch = useDispatch();
  const clips = useSelector((state: RootState) => state.clips.clips);
  const currentClipId = useSelector(
    (state: RootState) => state.clips.currentClipId
  );

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
              <button
                className="btn-sm"
                onClick={() => dispatch(setCurrentClip(clip.id))}
              >
                Play
              </button>
              {clip.id !== "full-video" && (
                <>
                  <button
                    className="btn-sm"
                    onClick={() => {
                      dispatch(setCurrentClip(clip.id));
                      // Aquí no es necesario cambiar nada más: el formulario sabrá que estamos editando
                    }}
                  >
                    Edit
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
