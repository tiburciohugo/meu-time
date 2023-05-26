/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { links } from "./Header";
import Link from "next/link";
import LogoutButton from "../LogoutButton";

export default function Menu() {
  const [isOpen, SetIsOpen] = useState(true);
  const toggle = () => SetIsOpen(!isOpen);

  return (
    <section className="w-full text-black">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={toggle}
            className="z-40 cursor-pointer"
          >
            <img
              src={isOpen ? "/icon-menu.svg" : "/icon-close.svg"}
              alt="menu"
            />
          </button>
        </div>
      </div>

      <aside className={`${isOpen ? "hidden" : ""}`}>
        <div className="absolute right-0 top-0 h-screen w-full bg-black bg-opacity-60"></div>
        <div className="absolute right-0 top-0 z-20 h-screen w-4/6 bg-white">
          <nav className="px-6 py-24 flex-col items-center justify-center">
            <ul className="space-y-5 flex-col items-center justify-center flex">
              {links.map((link, i) => (
                <Link
                  key={i}
                  className="font-bold text-slate-600 hover:text-primary py-1"
                  href={`/${link}`}
                >
                  {link}
                </Link>
              ))}
              <LogoutButton />
            </ul>
          </nav>
        </div>
      </aside>
    </section>
  );
}
