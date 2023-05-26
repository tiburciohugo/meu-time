/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { TeamStatistics } from "../GlobalRedux/Features/teamsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

type TeamStatisticsProps = {
  teamNumber: number | string;
  leagueNumber: number | string;
  seasonNumber: number | string;
};

export default function getTeamStatistics({
  teamNumber,
  leagueNumber,
  seasonNumber,
}: TeamStatisticsProps) {
  const apiKey = useSelector((state: RootState) => state.apiKey.value);

  const fetchTeamStatistics = async () => {
    try {
      const res2 = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${leagueNumber}&season=${seasonNumber}&team=${teamNumber}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
        }
      );

      if (!res2.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await res2.json();
      const teamStatistics: TeamStatistics[] = data.response;

      return teamStatistics;
    } catch (error) {
      console.error(error);
    }
  };
  fetchTeamStatistics();
}
