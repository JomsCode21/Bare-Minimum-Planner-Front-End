export interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (title: string, description: string, dueAt?: string) => Promise<void>;
  updateTask: (id: string, title: string, description: string, dueAt?: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleComplete: (task: Task) => Promise<void>;
}
