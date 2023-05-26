/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../GlobalRedux/store";
import Link from "next/link";
import { setTeams } from "../GlobalRedux/Features/teamsSlice";

export default function TeamSelector() {
  const dispatch: AppDispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.apiKey.value);
  const teams = useSelector((state: RootState) => state.teams.teams);
  const selectedLeague = useSelector(
    (state: RootState) => state.leagues.selectedLeague
  );
  const selectedSeason = useSelector(
    (state: RootState) => state.seasons.selectedSeason
  );

  useEffect(() => {
    if (selectedLeague && selectedLeague.league.id && selectedSeason) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api-football-v1.p.rapidapi.com/v3/teams?league=${selectedLeague.league.id}&season=${selectedSeason}`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key":
                  apiKey,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch teams");
          }

          const data = await response.json();
          dispatch(setTeams(data.response));
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [selectedLeague, selectedSeason, dispatch, apiKey]);

  return (
    <>
      <div className="px-6 flex-col items-center justify-center max-w-lg mx-auto pb-4">
        {teams
          ? teams.map((team) => (
              <div
                key={`${team.team.id}`}
                className="mx-auto mt-4 py-2 px-4 border border-slate-500 rounded block text-center"
              >
                <Link href={`/team/${team.team.id}`} className="flex items-center justify-between text- cursor-pointer">
                  <img
                    src={team.team.logo}
                    alt={team.team.name}
                    width={40}
                  />
                  <span className="text-2xl font-bold text-slate-300">
                    {team.team.name}
                  </span>
                </Link>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
