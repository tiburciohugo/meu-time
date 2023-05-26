"use client";
import React from "react";

type TableProps = {
  teamStats: {
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
  } | null;
};

export default function Table({ teamStats }: TableProps) {
  if (!teamStats || !teamStats.fixtures) return null;

  const { draws, loses, played, wins } = teamStats.fixtures;

  const statsData = [
    { title: "Empates", ...(draws || {}) },
    { title: "Derrotas", ...(loses || {}) },
    { title: "Jogadas", ...(played || {}) },
    { title: "Vitórias", ...(wins || {}) },
  ];

  return (
    <div className="mt-4 overflow-hidden rounded-lg border-2 border-slate-500 bg-slate-900 text-center text-slate-400">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b-2 border-slate-500 px-4 py-2">
              Resultados
            </th>
            <th className="border-b-2 border-slate-500 px-4 py-2">Fora</th>
            <th className="border-b-2 border-slate-500 px-4 py-2">Em casa</th>
            <th className="border-b-2 border-slate-500 px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {statsData.map((item) => (
            <tr key={item.title}>
              <td className="border-b border-slate-500 px-4 py-2">
                {item.title}
              </td>
              <td className="border-b border-slate-500 px-4 py-2">
                {item.away}
              </td>
              <td className="border-b border-slate-500 px-4 py-2">
                {item.home}
              </td>
              <td className="border-b border-slate-500 px-4 py-2">
                {item.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

