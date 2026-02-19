import type { Task } from "@/types/task";

export interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => Promise<void>;
}

export interface DeleteSuccessModalProps {
  isOpen: boolean;
  taskTitle: string;
  onClose: () => void;
}

export interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export interface DashboardCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
}

export interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdate: (id: string, title: string, description: string) => Promise<void>;
}

export interface ViewTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
}
