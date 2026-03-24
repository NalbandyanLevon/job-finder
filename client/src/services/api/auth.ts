import { User } from "@/entities/user/types";
import { apiFetch } from "./client";

interface IResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  user: User;
}

export const login = (email: string, password: string): Promise<IResponse> => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const register = (
  email: string,
  password: string,
): Promise<IResponse> => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const refresh = (): Promise<IResponse> => {
  return apiFetch("/auth/refresh", {
    method: "POST",
  });
};

export const logout = (): Promise<IResponse> => {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
};
