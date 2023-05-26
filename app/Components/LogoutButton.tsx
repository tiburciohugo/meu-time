import React from "react";
import { useDispatch } from "react-redux";
import {
  setApiKey,
  setIsValid,
  setIsLoading,
} from "../GlobalRedux/Features/apiKeySlice";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("apiKey");
    dispatch(setApiKey(""));
    dispatch(setIsValid(true));
    dispatch(setIsLoading(false));
    router.push("/");
  };

  return <button onClick={handleLogout} className="bg-emerald-600 rounded px-3 py-1 text-white hover:bg-primary transition ease-in-out delay-100">Logout</button>;
}
