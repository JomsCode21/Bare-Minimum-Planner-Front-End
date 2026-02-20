// This file contains all the API calls related to authentication and user management.
import apiClient from "@/axios/axios-instance";

// API calls for user authentication and management
export const checkAuth = () => apiClient.get("/api/users/check-auth");

export const login = (email: string, password: string) =>
  apiClient.post("/api/users/login", { email, password });

export const logout = () => apiClient.post("/api/users/logout");

export const checkEmail = (email: string) =>
  apiClient.post("/api/users/check-email", { email });

export const register = (name: string, email: string, password: string) =>
  apiClient.post("/api/users/register", { name, email, password });

export const forgotPassword = (email: string) =>
  apiClient.post("/api/users/forgotpassword", { email });

export const resetPassword = (userId: string, password: string) =>
  apiClient.put(`/api/users/${userId}`, { password });

export const googleLogin = (token: string) =>
  apiClient.post("/api/users/google", { token });
