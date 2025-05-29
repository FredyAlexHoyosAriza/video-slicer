import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clip } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface ClipsState {
  clips: Clip[];
  currentClipId: string | null;
  editForm: boolean;
}

const initialState: ClipsState = {
  clips: [
    {
      id: "full-video",
      name: "Full Video",
      startTime: 0,
      endTime: 0, // Se actualizará al cargar el video
      tags: [],
    },
  ],
  currentClipId: "full-video",
  editForm: false,
};

const clipsSlice = createSlice({
  name: "clips",
  initialState,
  reducers: {
    setFullVideoDuration: (state, action: PayloadAction<number>) => {
      const fullClip = state.clips.find((c) => c.id === "full-video");
      if (fullClip) fullClip.endTime = action.payload;
    },
    addClip: (state, action: PayloadAction<Omit<Clip, "id">>) => {
      state.clips.push({ ...action.payload, id: uuidv4() });
    },
    deleteClip: (state, action: PayloadAction<string>) => {
      state.clips = state.clips.filter((clip) => clip.id !== action.payload);
    },
    updateClip: (state, action: PayloadAction<Clip>) => {
      const index = state.clips.findIndex(
        (clip) => clip.id === action.payload.id
      );
      if (index !== -1)
        state.clips[index] = { ...state.clips[index], ...action.payload }; // action.payload;
    },
    setCurrentClip: (state, action: PayloadAction<string>) => {
      state.currentClipId = action.payload;
    },
    setEditForm: (state, action: PayloadAction<boolean>) => {
      state.editForm = action.payload;
    },
    loadClipsFromStorage: (state, action: PayloadAction<Clip[]>) => {
      state.clips = action.payload;
    },
    updateTags: (
      state,
      action: PayloadAction<{ id: string; tags: string[] }>
    ) => {
      const clip = state.clips.find((c) => c.id === action.payload.id);
      if (clip) clip.tags = action.payload.tags;
    },
  },
});

// No son reducers "addClip", etc, sino "action creators":
export const {
  addClip,
  deleteClip,
  updateClip,
  setCurrentClip,
  setFullVideoDuration,
  setEditForm,
  loadClipsFromStorage,
  updateTags
} = clipsSlice.actions;
// Devuelve algo como:
// {
//   type: 'clips/addClip',
//   payload: { id: 'parte 1', name: 'x', startTime: 0, endTime: 10 }
// }
export default clipsSlice.reducer;
