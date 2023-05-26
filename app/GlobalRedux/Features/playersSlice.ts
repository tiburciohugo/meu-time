"use client";
import { Player } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  players: Player[];
  status: "idle" | "loading" | "failed";
  player: Player | null;
  error: string | null;
  loading: boolean;
}

const initialState: PlayerState = {
  players: [],
  status: "idle",
  player: null,
  error: null,
  loading: false,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
