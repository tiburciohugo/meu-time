"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Team {
  team: {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
  };
}

export interface TeamStatistics {
  lineups: {
    formation: string;
    played: number;
  }[];
  goals: {
    for: {
      minute: {
        "0-15": {
          total: number;
          percentage: string;
        };
        "16-30": {
          total: number;
          percentage: string;
        };
        "31-45": {
          total: number;
          percentage: string;
        };
        "46-60": {
          total: number;
          percentage: string;
        };
        "61-75": {
          total: number;
          percentage: string;
        };
        "76-90": {
          total: number;
          percentage: string;
        };
        "91-105": {
          total: number | null;
          percentage: string | null;
        };
        "106-120": {
          total: number | null;
          percentage: string | null;
        };
      };
    };
  };
  fixtures: {
    draws: {
      away: number;
      home: number;
      total: number;
    };
    loses: {
      away: number;
      home: number;
      total: number;
    };
    played: {
      away: number;
      home: number;
      total: number;
    };
    wins: {
      away: number;
      home: number;
      total: number;
    };
  };
}

interface TeamsState {
  teams: Team[];
  status: "idle" | "loading" | "succeeded" | "failed" | null;
  error: string | null;
  loading: boolean;
  teamStatistics: TeamStatistics | null;
}

const initialState: TeamsState = {
  teams: [],
  loading: false,
  status: null,
  error: null,
  teamStatistics: null,
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },
    setTeamStatistics(state, action: PayloadAction<TeamStatistics>) {
      state.teamStatistics = action.payload;
    },
  },
});

export const { setTeams, setTeamStatistics } = teamsSlice.actions;

export default teamsSlice.reducer;
