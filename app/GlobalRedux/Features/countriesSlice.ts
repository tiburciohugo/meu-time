import { createSlice } from "@reduxjs/toolkit";

export interface Country {
  name: string;
  code: string;
  flag: string;
}

interface CountriesState {
  countries: Country[];
  selectedCountry: string;
}

const initialState: CountriesState = {
  countries: [],
  selectedCountry: "",
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setCountries, setSelectedCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
