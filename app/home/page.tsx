/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import Auth from "../Components/Auth";
import CountrySelector from "../Components/CountrySelector";
import SeasonSelector from "../Components/SeasonSelector";
import LeagueSelector from "../Components/LeagueSelector";
import TeamSelector from "../Components/TeamsSelector";
import Loading from "../Components/UI/Loading";

function page() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.apiKey.value);
  const isLoading = useSelector((state: RootState) => state.apiKey.isLoading);
  const selectedCountry = useSelector(
    (state: RootState) => state.countries.selectedCountry
  );

  if (isLoading) {
    return <Loading />;
  }

  if (apiKey) {
    return (
      <>
        <div className="mx-auto block w-full items-center justify-center text-center md:flex">
          <CountrySelector />
          <SeasonSelector />
          {selectedCountry && selectedCountry.length > 0 && <LeagueSelector />}
        </div>
        <TeamSelector />
      </>
    );
  }
  return null;
}

export default Auth(page);
