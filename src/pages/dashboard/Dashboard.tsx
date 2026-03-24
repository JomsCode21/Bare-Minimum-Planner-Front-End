import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "@/assets/BMP_logo.png";
import AddTaskModal from "@/components/dashboard/AddTaskModal";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DeleteSuccessModal from "@/components/dashboard/DeletesuccessModal";
import DeleteTaskModal from "@/components/dashboard/DeleteTaskModal";
import EditTaskModal from "@/components/dashboard/EditTaskModal";
import ViewTaskModal from "@/components/dashboard/ViewTaskModal";
import { useAuthStore } from "@/store/authStore";
import { useTaskStore } from "@/store/taskStore";
import type { Task } from "@/types/task";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const {
    tasks,
    isLoading,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useTaskStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteTaskTitle, setDeleteTaskTitle] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleAddTask = async (title: string, description: string) => {
    try {
      await addTask(title, description);
      setIsAddModalOpen(false);
      toast.success("Another masterpiece added to the list.");
    } catch {
      toast.error("Failed to add task.");
    }
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (
    id: string,
    title: string,
    description: string,
  ) => {
    try {
      await updateTask(id, title, description);
      setIsEditModalOpen(false);
      toast.success("Changes saved. Pretend it was intentional.");
    } catch {
      toast.error("Failed to update task.");
    }
  };

  const confirmDelete = (id: string) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!taskToDelete) return;

    const task = tasks.find((item) => item._id === taskToDelete);
    const title = task ? task.title : "Task";

    try {
      await deleteTask(taskToDelete);
      setIsDeleteModalOpen(false);
      setDeleteTaskTitle(title);
      setShowSuccessModal(true);
    } catch {
      toast.error("Failed to delete task.");
    } finally {
      setTaskToDelete(null);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    await toggleComplete(task);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
      toast.success("Goodbye. Your unfinished tasks will be waiting.");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Failed to logout properly.");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col overflow-hidden bg-linear-to-t from-primary to-bg2">
      <header className="w-full px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 rounded-[28px] bg-bg/20 px-4 py-4 text-center shadow-sm sm:flex-row sm:px-6 sm:text-left">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-full bg-bg/40 p-2 sm:p-3">
              <img
                src={logo}
                alt="Bare Minimum Logo"
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              />
            </div>
            <div>
              <p className="text-sm text-txt/80">Ready to barely conquer today?</p>
              <h2 className="text-xl font-bold text-txt sm:text-2xl">
                {user?.name || "User"}
              </h2>
            </div>
          </div>

          <p className="max-w-sm text-sm text-txt/70">
            Keep the list short, finish what matters, and call it a productive
            day.
          </p>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 px-4 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col">
          <section className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-[20px] border border-white/30 bg-bg2/50 shadow-lg backdrop-blur-md sm:rounded-[24px]">
            <div className="border-b border-gray-400/30 p-4 text-center sm:px-6">
              <h2 className="text-xl font-normal text-txt">Bare Minimum Tasks</h2>
              <p className="text-sm italic text-[#555]">"Just enough to survive."</p>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto p-4 sm:p-6">
              {isLoading ? (
                <div className="flex flex-col gap-2">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="flex animate-pulse items-center gap-3 rounded-[20px] border border-white/10 bg-bg2/30 p-4 shadow-sm sm:gap-4 sm:p-5"
                    >
                      <div className="h-6 w-6 shrink-0 rounded-full bg-gray-400/20"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-4 w-3/4 rounded-md bg-gray-400/20"></div>
                        <div className="h-3 w-1/2 rounded-md bg-gray-400/20"></div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-400/20"></div>
                        <div className="h-8 w-8 rounded-full bg-gray-400/20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : tasks.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-4 text-center text-txt/50 opacity-60">
                  <p className="text-lg">"Empty. As intended."</p>
                  <p className="mt-2 text-3xl">&lt;(o_o&lt;)&gt;</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {tasks.map((task) => (
                    <div
                      key={task._id}
                      onClick={() => handleViewTask(task)}
                      className="cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
                    >
                      <DashboardCard
                        task={task}
                        onDelete={confirmDelete}
                        onToggle={handleToggleComplete}
                        onEdit={openEditModal}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="relative w-full shrink-0">
        <svg
          viewBox="0 0 375 80"
          className="h-20 w-full drop-shadow-lg sm:h-24"
          preserveAspectRatio="none"
        >
          <path d="M0,80 L0,40 Q187.5,0 375,40 L375,80 Z" fill="#F5F5F5" />
        </svg>

        <div className="absolute inset-0 flex items-end justify-center gap-6 pb-4 sm:gap-12 sm:pb-6">
          <button
            type="button"
            className="rounded-xl bg-primary p-3 text-white shadow-md transition-transform hover:scale-110 disabled:opacity-60 sm:p-4"
            onClick={() => setIsAddModalOpen(true)}
            disabled={isAddModalOpen}
          >
            <FaPlus />
          </button>

          <button
            type="button"
            className={`flex items-center justify-center gap-2 rounded-xl p-3 shadow-md transition-all sm:p-4 ${
              isLoggingOut
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#EF4444] text-txt hover:scale-110"
            }`}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <ImExit />
            )}
          </button>
        </div>
      </footer>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />

      {isEditModalOpen && taskToEdit && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={taskToEdit}
          onUpdate={handleUpdateTask}
        />
      )}

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={executeDelete}
      />

      <ViewTaskModal
        isOpen={isViewModalOpen}
        task={selectedTask}
        onClose={() => setIsViewModalOpen(false)}
      />

      <DeleteSuccessModal
        isOpen={showSuccessModal}
        taskTitle={deleteTaskTitle}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

export default Dashboard;
