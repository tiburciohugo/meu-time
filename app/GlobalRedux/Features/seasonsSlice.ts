import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SeasonsState {
  seasons: number[];
  selectedSeason: string;
}

const initialState: SeasonsState = {
  seasons: [],
  selectedSeason: "",
};

export const seasonsSlice = createSlice({
  name: "seasons",
  initialState,
  reducers: {
    setSeasons: (state, action: PayloadAction<number[]>) => {
      state.seasons = action.payload;
    },
    setSelectedSeason: (state, action: PayloadAction<string>) => {
      state.selectedSeason = action.payload;
    },
  },
});

export const { setSeasons, setSelectedSeason } = seasonsSlice.actions;

export default seasonsSlice.reducer;
