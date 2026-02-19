import { create } from "zustand";
import { persist } from "zustand/middleware"; // 👈 1. Import persist
import type { AuthState, User } from "@/types/auth";
import { checkAuth as checkAuthApi, logout as logoutApi } from "@/api/auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,

      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const response = await checkAuthApi();
          set({
            user: response.data.user,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
        } catch {
          // If the backend says "no cookie", wipe the persisted state!
          set({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: false,
          });
        }
      },

      login: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      logout: async () => {
        try {
          await logoutApi();
          set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        } catch (error) {
          console.error("Logout failed", error);
          set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
