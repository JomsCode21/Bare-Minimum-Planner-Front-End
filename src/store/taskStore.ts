import { create } from "zustand";
import type { Task, TaskState } from "@/types/task";
import {
  addTask as addTaskApi,
  deleteTask as deleteTaskApi,
  fetchTasks as fetchTasksApi,
  toggleTaskComplete,
  updateTask as updateTaskApi,
} from "@/api/tasks";

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,

  // Fetch all tasks
  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const response = await fetchTasksApi();
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ isLoading: false });
    }
  },

  // Add a new task
  addTask: async (title: string, description: string) => {
    try {
      const response = await addTaskApi(title, description);
      // Add the new task to the VERY TOP of the existing list instantly
      set((state) => ({ tasks: [response.data, ...state.tasks] }));
    } catch (error) {
      console.error("Error adding task:", error);
      throw error; // Throwing allows the Dashboard to show an error toast
    }
  },

  // Edit a task
  updateTask: async (id: string, title: string, description: string) => {
    try {
      // Optimistic UI Update: Change it on the screen immediately before the backend even replies
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t._id === id ? { ...t, title, description } : t,
        ),
      }));
      // Then send the request to the database
      await updateTaskApi(id, title, description);
    } catch (error) {
      console.error("Error updating task:", error);
      get().fetchTasks(); // If it fails, re-fetch to fix the UI
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id: string) => {
    try {
      // Instantly remove it from the screen
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id),
      }));
      await deleteTaskApi(id);
    } catch (error) {
      console.error("Error deleting task:", error);
      get().fetchTasks();
      throw error;
    }
  },

  // Toggle Completion Checkbox
  toggleComplete: async (task: Task) => {
    const newStatus = !task.isCompleted;
    try {
      // Instantly check/uncheck on the screen
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t._id === task._id ? { ...t, isCompleted: newStatus } : t,
        ),
      }));
      await toggleTaskComplete(task._id, newStatus);
    } catch (error) {
      console.error("Error toggling task:", error);
      get().fetchTasks();
    }
  },
}));
