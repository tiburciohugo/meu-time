"use client";
import React from "react";
import { League_Spartan } from "next/font/google";
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import Menu from "./Menu";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export const links = ["Países", "Campeonatos", "Times", "Jogadores"];

export default function Header() {
  return (
    <header className="mx-auto flex items-center justify-between gap-24 px-6 py-4 text-center lg:px-32 xl:px-52">
      <Link href={"/home"}>
        <h1
          className={`text-3xl font-bold text-slate-300 ${leagueSpartan.className}`}
        >
          MeuTime
        </h1>
      </Link>
      <nav>
        <ul className="hidden items-center space-x-4 text-center md:flex">
          {links.map((link, i) => (
            <li key={i}>
              <Link
                href={`/${link}`}
                className="border-primary py-2 font-bold text-gray-300 transition delay-100 ease-in-out hover:border-b-2 hover:text-primary"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden md:block">
        <LogoutButton />
      </div>

      <div className="md:hidden">
        <Menu />
      </div>
    </header>
  );
}
