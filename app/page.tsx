"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setApiKey,
  setIsLoading,
  setIsValid,
} from "./GlobalRedux/Features/apiKeySlice";
import { ChangeEvent } from "react";
import { RootState } from "@/app/GlobalRedux/store";

export default function Login() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.apiKey.value);
  const isValid = useSelector((state: RootState) => state.apiKey.isValid);
  const isLoading = useSelector((state: RootState) => state.apiKey.isLoading);
  const router = useRouter();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };
    const response = await fetch(
      "https://api-football-v1.p.rapidapi.com/v3/timezone",
      options
    );
    dispatch(setIsLoading(false));

    if (response.ok) {
      localStorage.setItem("apiKey", apiKey);
      router.push("/home");
    } else {
      dispatch(setIsValid(false));
    }
  };

  const handleApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setApiKey(e.target.value));
    dispatch(setIsValid(true));
  };

  return (
    <main className="flex h-screen items-center justify-center">
      <section className="rounded-lg bg-gray-100 py-10 shadow-md">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
              Olá!
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
              Faça o Login para acessar o sistema
            </p>
          </div>

          <div className="mx-auto mt-4 max-w-md md:mt-16">
            <div className="overflow-hidden rounded-md bg-white shadow-md">
              <div className="px-4 py-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="apiKey"
                        className="text-base font-medium text-slate-900"
                      >
                        {" "}
                        API Key{" "}
                      </label>
                      <div className="relative mt-2.5 text-gray-400 focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                            />
                          </svg>
                        </div>

                        <input
                          type="text"
                          id="apiKey"
                          value={apiKey}
                          onChange={handleApiKeyChange}
                          placeholder="Insira sua API Key"
                          className="block w-full rounded-md border border-gray-200 bg-white py-6 pl-10 pr-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                      {!isValid && (
                        <p className="text-sm text-red-500">Chave inválida</p>
                      )}

                      {isLoading && (
                        <p className="text-sm text-blue-500">
                          Checando API key...
                        </p>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
                      >
                        Log in
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-sm font-semibold text-gray-600">
                    Não tem uma API Key? Clique{" "}
                    <a
                      href="https://rapidapi.com/api-sports/api/api-football"
                      target="_blank"
                      className="text-blue-600 transition-all duration-200 hover:text-blue-500"
                    >
                      aqui
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
