import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Stores
import { useAuthStore } from "@/store/authStore";
import { useTaskStore } from "@/store/taskStore";

// Components
import logo from "@/assets/BMP_logo.png";
import AddTaskModal from "@/components/dashboard/AddTaskModal";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DeleteSuccessModal from "@/components/dashboard/DeletesuccessModal";
import DeleteTaskModal from "@/components/dashboard/DeleteTaskModal";
import EditTaskModal from "@/components/dashboard/EditTaskModal";
import ViewTaskModal from "@/components/dashboard/ViewTaskModal";
import type { Task } from "@/types/task";

function Dashboard() {
  const navigate = useNavigate();

  // Pull user from Auth Store
  const { user, logout } = useAuthStore();

  // Pull everything from Task Store!
  const { tasks, isLoading, fetchTasks, addTask, updateTask, deleteTask, toggleComplete } = useTaskStore();

  // Modal States (Keep these, they control the UI)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteTaskTitle, setDeleteTaskTitle] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoggingout, setIsLoggingOut] = useState(false);

  // Fetch tasks when Dashboard loads
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // For Viewing Task
  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  // CLEANED UP HANDLERS
  const handleAddTask = async (title: string, description: string) => {
    try {
      await addTask(title, description); // Tell store to add it
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
      await updateTask(id, title, description); // Tell store to update it
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
    const task = tasks.find((t) => t._id === taskToDelete);
    const title = task ? task.title : "Task";

    try {
      await deleteTask(taskToDelete); // Tell store to delete it
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
    await toggleComplete(task); // Tell store to toggle it
  };

  const handleLogout = async () => {
    if (isLoggingout) return;
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
    <div className="bg-linear-to-t from-primary to-bg2 h-screen flex flex-col relative overflow-hidden">
      {/* Header section */}
      <header className="flex items-center justify-center px-6 pt-4 pb-8">
        <div className="bg-bg/20 p-2 rounded-full mr-10">
          <img
            src={logo}
            alt="Bare Minimum Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="text-right">
          <p className="text-sm text-txt/800">Ready to barely conquer today?</p>
          <h2 className="font-bold text-md text-txt text-center">
            {user?.name || "User"} ツ
          </h2>
        </div>
      </header>

      {/* Dashboard */}
      <div className="flex-1 w-full max-w-md px-6 flex flex-col items-center mx-auto h-10">
        <div className="bg-bg2/50 backdrop-blur-md w-full h-full rounded-[20px] shadow-lg flex flex-col overflow-hidden border border-white/30">
          <div className="p-4 text-center border-b border-gray-400/30">
            <h2 className="text-xl font-normal text-txt">Bare Minimum Tasks</h2>
            <p className="text-sm text-[#555] italic">
              “Just enough to survive.”
            </p>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar max-h-auto">
            {isLoading ? (
              <div className="flex flex-col gap-2">
                {[...Array(4)].map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-bg2/30 animate-pulse border border-white/10 rounded-[20px] p-5 flex items-center gap-4 shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-400/20 shrink-0"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-400/20 rounded-md w-3/4"></div>
                      <div className="h-3 bg-gray-400/20 rounded-md w-1/2"></div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-400/20"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-400/20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-txt/500 opacity-60">
                <p className="text-lg">"Empty. As intended."</p>
                <p className="text-3xl mt-2">{"<(￣︶￣)>"}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    onClick={() => handleViewTask(task)}
                    className="cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all duration-200"
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
        </div>
      </div>

      {/* Nav buttons */}
      <div className="relative w-full">
        <svg
          viewBox="0 0 375 80"
          className="w-full h-24 drop-shadow-lg"
          preserveAspectRatio="none"
        >
          <path d="M0,80 L0,40 Q187.5,0 375,40 L375,80 Z" fill="#F5F5F5" />
        </svg>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-end justify-center pb-6 space-x-12">
          <button
            className="bg-primary text-white p-3 rounded-xl shadow-md hover:scale-110 transition-transform"
            onClick={() => setIsAddModalOpen(true)}
            disabled={isAddModalOpen}
          >
            <FaPlus />
          </button>
          <button
            className={`
              p-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2
              ${isLoggingout ? "bg-gray-400 cursor-not-allowed" : "bg-[#EF4444] text-txt hover:scale-110"}
            `}
            onClick={handleLogout}
            disabled={isLoggingout}
          >
            {isLoggingout ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
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

        {/* Modals */}
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
    </div>
  );
}

export default Dashboard;