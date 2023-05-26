/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ChangeEvent, useEffect } from "react";
import {
  setLeagues,
  setSelectedLeague,
} from "../GlobalRedux/Features/leaguesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { League } from "../GlobalRedux/Features/leaguesSlice";

export default function LeagueSelector() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.apiKey.value);
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry
  );
  const leagues = useSelector((state: RootState) => state.leagues.leagues);
  const selectedLeague = useSelector(
    (state: RootState) => state.leagues.selectedLeague
  );

  useEffect(() => {
    const fetchLeagues = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            apiKey,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };
      const response = await fetch(
        "https://api-football-v1.p.rapidapi.com/v3/leagues?country=" +
          encodeURIComponent(selectedCountry || ""),
        options
      );

      if (!response.ok) {
        throw new Error("Error fetching leagues");
      }

      const data = await response.json();
      dispatch(setLeagues(data.response));
    };

    if (selectedCountry && selectedCountry.length > 0 && leagues.length === 0) {
      fetchLeagues().catch((error) => console.error(error));
    }

    if (selectedCountry && leagues.length === 0) {
      fetchLeagues().catch((error) => console.error(error));
    }
  }, [selectedCountry, leagues.length, dispatch]);

  const handleLeagueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const leagueId = Number(event.target.value);
    const league =
      leagues.find((league) => league.league.id === leagueId) || null;
    dispatch(setSelectedLeague(league));
  };

  return (
    <div className="flex-col items-center justify-center px-6 w-3/4 mx-auto md:mx-0">
      <select
        value={selectedLeague?.league?.id || ""}
        onChange={handleLeagueChange}
        className="mx-auto mt-4 p-2 border border-slate-500 rounded block w-full md:w-3/4"
      >
        <option value="">Selecine uma liga</option>
        {leagues.map((league: League) => (
          <option
            key={league.league.id}
            value={league.league.id}
          >
            {league.league.name}
          </option>
        ))}
      </select>

      {selectedLeague ? (
        <div className="flex gap-4 border-2 border-slate-500 rounded mt-4 py-2 px-4 mx-auto w-full items-center justify-center">
          <img
            src={selectedLeague.league.logo}
            alt={`${selectedLeague.league.name} logo`}
            className="h-10 w-10"
          />
          <h1 className="text-3xl font-bold text-slate-300">
            {selectedLeague.league.name}
          </h1>
        </div>
      ) : null}
    </div>
  );
}
