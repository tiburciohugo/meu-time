/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ChangeEvent, useEffect, useMemo } from "react";
import {
  setCountries,
  setSelectedCountry,
} from "../GlobalRedux/Features/countriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export default function CountrySelector() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.apiKey.value);
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry
  );

  const selectedCountryData = countries.find(
    (country) => country.name === selectedCountry
  );

  const countryNames = useMemo(
    () => ["Brazil", "Spain", "England", "Italy", "France", "Germany"],
    []
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://api-football-v1.p.rapidapi.com/v3/countries",
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
        const allCountriesData = data.response;

        localStorage.setItem("countries", JSON.stringify(allCountriesData));

        dispatch(setCountries(allCountriesData));
      } catch (error) {
        console.error(error);
      }
    };

    const storedCountries = localStorage.getItem("countries");

    if (!storedCountries) {
      fetchCountries();
    } else {
      dispatch(setCountries(JSON.parse(storedCountries)));
    }
  }, [dispatch, apiKey]);

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    dispatch(setSelectedCountry(country));
  };

  return (
    <div className="mx-auto w-3/4 flex-col items-center justify-center px-6 md:mx-0">
      <select
        value={selectedCountry || ""}
        onChange={handleCountryChange}
        className="mx-auto mt-4 block w-full rounded border border-slate-500 p-2 md:w-3/4"
      >
        <option value="">Selecione um país</option>
        {countryNames.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {selectedCountryData ? (
        <div className="mx-auto mt-4 flex w-48 items-center justify-center gap-4 rounded border-2 border-slate-500 px-4 py-2">
          <h1
            className={`text-3xl font-bold text-slate-300 ${leagueSpartan.className}`}
          >
            {selectedCountryData.name}
          </h1>
          <img
            src={selectedCountryData.flag}
            alt={`Bandeira do(a) ${selectedCountryData.name}`}
            width={40}
            className="rounded-full"
          />
        </div>
      ) : null}
    </div>
  );
}
