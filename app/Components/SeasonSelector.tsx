"use client";
import React, { ChangeEvent, useEffect } from "react";
import {
  setSeasons,
  setSelectedSeason,
} from "../GlobalRedux/Features/seasonsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

export default function SeasonSelector() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.apiKey.value);
  const seasons = useSelector((state: RootState) => state.seasons.seasons);
  const selectedSeason = useSelector(
    (state: RootState) => state.seasons.selectedSeason
  );

  useEffect(() => {
    const storedSeasons = localStorage.getItem("seasons");

    if (storedSeasons) {
      dispatch(setSeasons(JSON.parse(storedSeasons)));
    } else {
      fetchSeasons();
    }
  }, [dispatch]);

  const fetchSeasons = async () => {
    try {
      const response = await fetch(
        "https://api-football-v1.p.rapidapi.com/v3/leagues/seasons",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      const data = await response.json();
      const allSeasonsData = data.response;

      localStorage.setItem("seasons", JSON.stringify(allSeasonsData));

      dispatch(setSeasons(allSeasonsData));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeasonChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedSeason(event.target.value));
  };

  return (
    <div className="mx-auto w-3/4 flex-col items-center justify-center px-6 md:mx-0">
      <select
        value={selectedSeason}
        onChange={(e) => dispatch(setSelectedSeason(e.target.value))}
        className="mx-auto mt-4 block w-full rounded border border-slate-500 p-2 md:w-3/4"
      >
        <option value="">Selecione uma temporada</option>
        {seasons.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </select>

      {selectedSeason ? (
        <div className="mx-auto mt-4 flex w-48 items-center justify-center gap-4 rounded border-2 border-slate-500 px-4 py-2">
          <h1 className="text-3xl font-bold text-slate-300">
            {selectedSeason}
          </h1>
        </div>
      ) : null}
    </div>
  );
}
