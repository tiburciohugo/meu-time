"use client";
import { configureStore } from "@reduxjs/toolkit";
import apiKeyReducer from "./Features/apiKeySlice";
import countriesReducer from "./Features/countriesSlice";
import leaguesReducer from "./Features/leaguesSlice";
import seasonsReducer from "./Features/seasonsSlice";
import teamsReducer from "./Features/teamsSlice";
import playersReducer from "./Features/playersSlice";

export const store = configureStore({
  reducer: {
    apiKey: apiKeyReducer,
    countries: countriesReducer,
    leagues: leaguesReducer,
    seasons: seasonsReducer,
    teams: teamsReducer,
    players: playersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
