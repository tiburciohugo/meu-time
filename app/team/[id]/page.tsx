/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import Chart from "@/app/Components/UI/Chart";
import Loading from "@/app/Components/UI/Loading";
import Table from "@/app/Components/UI/Table";
import TeamFormation from "@/app/Components/UI/TeamFormation";
import { setPlayers } from "@/app/GlobalRedux/Features/playersSlice";
import { setTeamStatistics } from "@/app/GlobalRedux/Features/teamsSlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "@/app/Components/Auth";

type PagesProps = {
  params: { id: string };
};

function PlayersPage({ params }: PagesProps): JSX.Element | null {
  const dispatch: AppDispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.apiKey.value);
  const isLoading = useSelector((state: RootState) => state.apiKey.isLoading);
  const players = useSelector((state: RootState) => state.players.players);
  const selectedSeason = useSelector(
    (state: RootState) => state.seasons.selectedSeason
  );
  const teamStats = useSelector(
    (state: RootState) => state.teams.teamStatistics
  );
  const selectedLeague = useSelector(
    (state: RootState) => state.leagues.selectedLeague
  );

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const fetchPlayerInfo = fetch(
          `https://api-football-v1.p.rapidapi.com/v3/players?team=${params.id}&season=${selectedSeason}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
              "x-rapidapi-key": apiKey,
            },
          }
        );

        const fetchTeamStatistics = fetch(
          `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${selectedLeague?.league.id}&season=${selectedSeason}&team=${params.id}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
              "x-rapidapi-key": apiKey,
            },
          }
        );

        const [getPlayerInfoResponse, getTeamStatisticsResponse] =
          await Promise.all([fetchPlayerInfo, fetchTeamStatistics]);

        if (!getPlayerInfoResponse.ok || !getTeamStatisticsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const playerData = await getPlayerInfoResponse.json();
        const teamData = await getTeamStatisticsResponse.json();

        dispatch(setPlayers(playerData.response));
        dispatch(setTeamStatistics(teamData.response));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
  }, [dispatch, params.id, selectedSeason, selectedLeague, apiKey]);

  return (
    <div className="w-full gap-4 px-6 py-4 lg:px-32 xl:mx-auto xl:justify-center">
      {/* Team logo */}
      {players.length > 0 && players[0].statistics.length > 0 && (
        <div className="mx-auto flex max-w-xs items-center justify-between">
          <img
            src={players[0].statistics[0].team.logo}
            alt={players[0].statistics[0].team.name}
            width={80}
          />
          <h1 className="text-center text-2xl text-slate-400">
            {players[0].statistics[0].team.name}
          </h1>
        </div>
      )}

      <div
        id="outer-div"
        className="mx-auto w-full justify-between gap-4 md:flex lg:justify-evenly"
      >
        {/* Players */}
        <div id="players-div" className="lg:w-0.5/2 w-full md:w-1/2">
          {players.slice(0, 11).map((player, index) => (
            <div
              key={player.player.id}
              className="mt-4 flex w-full items-center justify-between space-x-2 rounded border-2 border-slate-500 px-4 py-2"
            >
              <div className="flex w-full items-center justify-between space-x-4 border-l-2 border-slate-500 px-2">
                <div className="ml-2 flex items-center gap-4">
                  <p className="text-left text-sm font-semibold text-white">
                    {index + 1}
                  </p>
                  <img
                    src={`${player.player.photo}`}
                    alt={`${player.player.firstname}`}
                    width={40}
                    className="rounded-full"
                  />
                  <h2 className="pr-2 text-sm font-bold text-slate-400">
                    {`${player.player.firstname}`}
                  </h2>
                </div>
                <div className="flex-col space-x-2">
                  <p className="text-right text-sm font-semibold text-gray-500">
                    {player.player.age}
                  </p>
                  <p className="text-right text-sm font-semibold text-gray-500">
                    {player.player.nationality}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Statistics */}
        <div className="flex-col justify-start gap-4 space-y-4 pt-2">
          <TeamFormation teamStats={teamStats} />

          <Table teamStats={teamStats} />

          <Chart teamStats={teamStats} />
        </div>
      </div>
    </div>
  );
}

export default Auth(PlayersPage);
