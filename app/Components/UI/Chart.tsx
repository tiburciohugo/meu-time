"use client";
import React from "react";

type GoalStat = {
  total: number | null;
  percentage: string | null;
};

type ChartProps = {
  teamStats: {
    goals: {
      for: {
        minute: {
          "0-15": GoalStat;
          "16-30": GoalStat;
          "31-45": GoalStat;
          "46-60": GoalStat;
          "61-75": GoalStat;
          "76-90": GoalStat;
          "91-105": GoalStat | null;
          "106-120": GoalStat | null;
        };
      };
    };
  } | null;
};

export default function Chart({ teamStats }: ChartProps) {
  if (!teamStats || !teamStats.goals || !teamStats.goals.for) return null;

  const goalMinutes = Object.keys(teamStats.goals.for.minute);

  return (
    <div className="rounded-lg border-2 border-slate-500 bg-slate-900 text-center text-slate-400 shadow-lg">
      <h1 className="border-b border-slate-500 py-2 text-center text-3xl font-bold">
        Gols por Minuto
      </h1>
      <div className="flex flex-wrap justify-center">
        {goalMinutes.map((minute) => {
          const currentMinute =
            teamStats.goals.for.minute[
              minute as keyof typeof teamStats.goals.for.minute
            ];
          if (currentMinute) {
            return (
              <div key={minute} className="m-4">
                <div
                  style={{ height: `${currentMinute.total}px` }}
                  className="bg-blue-500"
                />
                <p className="text-white">{currentMinute.percentage}</p>
                <p className="mt-2">
                  Minutos: <span className="text-white">{minute}</span>
                </p>
                <p className="mt-2">
                  Total:{" "}
                  <span className="text-white">
                    {currentMinute?.total ?? 0}
                  </span>
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

