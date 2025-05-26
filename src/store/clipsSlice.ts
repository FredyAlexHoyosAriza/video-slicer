import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Clip } from '@/types';

interface ClipsState {
  clips: Clip[];
}

const initialState: ClipsState = {
  clips: [],
};

const clipsSlice = createSlice({
  name: 'clips',
  initialState,
  reducers: {
    addClip: (state, action: PayloadAction<Clip>) => {
      state.clips.push(action.payload);
    },
    deleteClip: (state, action: PayloadAction<string>) => {
      state.clips = state.clips.filter(clip => clip.id !== action.payload);
    },
    updateClip: (state, action: PayloadAction<Clip>) => {
      const index = state.clips.findIndex(clip => clip.id === action.payload.id);
      if (index !== -1) {
        state.clips[index] = action.payload;
      }
    },
  },
});

export const { addClip, deleteClip, updateClip } = clipsSlice.actions;
export default clipsSlice.reducer;
