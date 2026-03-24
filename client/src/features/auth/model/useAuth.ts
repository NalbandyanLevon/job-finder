import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { accessToken, setAccessToken } = useAuthStore();

  return { accessToken, setAccessToken, isAuth: !!accessToken };
};
