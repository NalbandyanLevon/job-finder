"use client";

import { ReactNode, useEffect } from "react";
import { refresh } from "@/services/api/auth";
import { useAuthStore } from "@/store/authStore";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setAccessToken, setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        const data = await refresh();
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          if (data.user) setUser(data.user);
        }
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [setAccessToken, setIsLoading, setUser]);

  return <>{children}</>;
};
