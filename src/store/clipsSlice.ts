import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Clip } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface ClipsState {
  clips: Clip[];
  currentClipId: string | null;
}

const initialState: ClipsState = {
  clips: [
    {
      id: 'full-video',
      name: 'Full Video',
      startTime: 0,
      endTime: 0, // Se actualizará al cargar el video
    },
  ],
  currentClipId: 'full-video',
};

const clipsSlice = createSlice({
  name: 'clips',
  initialState,
  reducers: {
    setFullVideoDuration: (state, action: PayloadAction<number>) => {
      const fullClip = state.clips.find((c) => c.id === 'full-video');
      if (fullClip) fullClip.endTime = action.payload;
    },
    addClip: (state, action: PayloadAction<Omit<Clip, 'id'>>) => {
      state.clips.push({ ...action.payload, id: uuidv4() });
    },
    deleteClip: (state, action: PayloadAction<string>) => {
      state.clips = state.clips.filter((clip) => clip.id !== action.payload);
    },
    updateClip: (state, action: PayloadAction<Clip>) => {
      const index = state.clips.findIndex((clip) => clip.id === action.payload.id);
      if (index !== -1) state.clips[index] = action.payload;
    },
    setCurrentClip: (state, action: PayloadAction<string>) => {
      state.currentClipId = action.payload;
    },
  },
});

// No son reducers "addClip", etc, sino "action creators":
export const { addClip, deleteClip, updateClip, setCurrentClip, setFullVideoDuration } = clipsSlice.actions;
// Devuelve algo como:
// {
//   type: 'clips/addClip',
//   payload: { id: 'parte 1', name: 'x', startTime: 0, endTime: 10 }
// }
export default clipsSlice.reducer;
