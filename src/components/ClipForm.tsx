"use client";

import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addClip,
  updateClip,
  setCurrentClip,
  setEditForm,
} from "@/store/clipsSlice";
import { RootState } from "@/store/index";
import { Clip } from "@/types";

export default function ClipForm() {
  const dispatch = useDispatch();
  const { clips, currentClipId, editForm } = useSelector(
    (state: RootState) => state.clips
  );
  const currentClip = clips.find((c) => c.id === currentClipId); // && c.id !== 'full-video'

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(() => currentClip?.tags ?? []);


  useEffect(() => {
    if (editForm && currentClip) {
      setName(currentClip.name);
      setStartTime(currentClip.startTime);
      setEndTime(currentClip.endTime);
      setTags(currentClip.tags);
    } else {
      resetForm();
    }
  }, [editForm]);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const resetForm = () => {
    setName("");
    setStartTime(0);
    setEndTime(0);
    setTags([]);
    if (editForm) dispatch(setEditForm(false));
    // else dispatch(setCurrentClip('full-video'));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || startTime >= endTime) return;

    if (editForm && currentClip) {
      dispatch(updateClip({ ...currentClip, name, startTime, endTime, tags }));
    } else {
      dispatch(addClip({ name, startTime, endTime, tags }));
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={startTime}
        onChange={(e) => setStartTime(Number(e.target.value))}
        className="input"
        placeholder="Start Time (s)"
      />
      <input
        type="number"
        value={endTime}
        onChange={(e) => setEndTime(Number(e.target.value))}
        className="input"
        placeholder="End Time (s)"
      />
      <div className="flex gap-2 flex-wrap">
        {(tags ?? []).map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-red-600"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="input"
          placeholder="Add tag"
        />
        <button type="button" onClick={addTag} className="btn-sm">
          Add Tag
        </button>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn">
          {editForm ? "Update Clip" : "Add Clip"}
        </button>
        {editForm && (
          <button type="button" className="btn-sm" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
