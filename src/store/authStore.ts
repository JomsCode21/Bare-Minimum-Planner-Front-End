import { create } from "zustand";
import api from "@/api/axios";

// User looks like
interface User {
    id: string;
    name: string;
    email: string;
}

// For storing State
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;

    checkAuth: () => Promise<void>;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({

    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await api.get("/api/users/check-auth");
            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false,
            });
        } catch {
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
            await api.post("/api/users/logout");
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        } catch (error) {
            console.error("Logout failed", error);
            set({ user: null, isAuthenticated: false, isCheckingAuth:false });
        }
    },
}));