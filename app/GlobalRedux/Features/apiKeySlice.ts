"use client";
import { createSlice } from "@reduxjs/toolkit";

interface ApiKeyState {
  value: string;
  isValid: boolean;
  isLoading: boolean;
}

const initialState: ApiKeyState = {
  value: "",
  isValid: true,
  isLoading: false,
};

export const apiKeySlice = createSlice({
  name: "apiKey",
  initialState,
  reducers: {
    setApiKey: (state, action) => {
      state.value = action.payload;
    },
    setIsValid: (state, action) => {
      state.isValid = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setApiKey, setIsValid, setIsLoading } = apiKeySlice.actions;

export default apiKeySlice.reducer;
