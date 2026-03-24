import { User } from "@/entities/user/types";
import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null, accessToken: null });
  },
}));
