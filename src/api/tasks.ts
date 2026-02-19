import apiClient from "@/axios/axios-instance";
import type { Task } from "@/types/task";

export const fetchTasks = () => apiClient.get<Task[]>("/api/tasks");

export const addTask = (title: string, description: string) =>
  apiClient.post<Task>("/api/tasks", { title, description });

export const updateTask = (id: string, title: string, description: string) =>
  apiClient.put(`/api/tasks/${id}`, { title, description });

export const deleteTask = (id: string) => apiClient.delete(`/api/tasks/${id}`);

export const toggleTaskComplete = (id: string, isCompleted: boolean) =>
  apiClient.put(`/api/tasks/${id}`, { isCompleted });
