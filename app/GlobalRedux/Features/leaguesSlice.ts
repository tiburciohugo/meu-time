import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface League {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    flag: string;
  };
}

export interface LeaguesState {
  leaguesFrom2022: League[];
  seasons: number[];
  leagues: League[];
  selectedLeague: League | null;
}

const initialState: LeaguesState = {
  leaguesFrom2022: [],
  seasons: [],
  leagues: [],
  selectedLeague: null,
};

export const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setLeaguesFrom2022: (state, action) => {
      state.leaguesFrom2022 = action.payload;
    },
    setLeagues: (state, action) => {
      state.leagues = action.payload;
    },
    setSeasons: (state, action: PayloadAction<number[]>) => {
      state.seasons = action.payload;
    },
    setSelectedLeague: (state, action: PayloadAction<League | null>) => {
      state.selectedLeague = action.payload;
    },
  },
});

export const { setLeaguesFrom2022, setLeagues, setSelectedLeague, setSeasons } =
  leaguesSlice.actions;

export default leaguesSlice.reducer;
