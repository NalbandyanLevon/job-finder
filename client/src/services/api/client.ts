import { useAuthStore } from "@/store/authStore";

const BASE_URL = "http://localhost:8080/api";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }
  return res.json();
};
