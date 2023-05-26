"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

type AuthProps = {
  params: { id: string };
};

export default function Auth<T extends AuthProps>(
  ProtectedComponent: React.ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const router = useRouter();
    const apiKey = useSelector((state: RootState) => state.apiKey.value);

    useEffect(() => {
      if (!apiKey) {
        router.replace("/");
      }
    }, [apiKey, router]);

    return apiKey ? <ProtectedComponent {...props} /> : null;
  };
}
