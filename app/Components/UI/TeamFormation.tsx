"use client";
import React from "react";

type TeamFormationProps = {
  teamStats: {
    lineups: {
      formation: string;
      played: number;
    }[];
  } | null;
};

export default function TeamFormation({ teamStats }: TeamFormationProps) {
  return teamStats && teamStats.lineups ? (
    <div className="mx-auto mt-6 flex-col items-center justify-center rounded-lg border-2 border-slate-500 bg-slate-900 py-2 shadow-lg md:mt-2 md:w-1/2">
      <h1 className="text-center text-2xl text-slate-400">
        Formações mais utilizadas
      </h1>
      <div className="mx-auto mt-2 flex-col items-center justify-center space-y-2 text-center">
        {teamStats.lineups.map((lineup, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <p className="text-center text-sm font-semibold text-white">
              {lineup.formation}
            </p>
            <p className="text-center text-sm font-semibold text-white">
              {lineup.played}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}

