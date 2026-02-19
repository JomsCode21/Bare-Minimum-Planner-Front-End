import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAuthRoute =
        error.config.url.includes("/login") ||
        error.config.url.includes("/check-auth");

      if (!isAuthRoute) {
        console.error("Session expired! Auto-logging out...");
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
