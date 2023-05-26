"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../GlobalRedux/store";

type PageProps = {
  teamId: string;
  season: string;
};

export default async function FetchPlayers({ teamId, season }: PageProps) {
  const dispatch: AppDispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.apiKey.value);

  try {
    const res = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamId}&season=${season}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch teams");
    }
    const data = await res.json();
    dispatch;
  } catch (error) {
    console.error(error);
  }
}
