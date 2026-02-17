import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { ImExit } from "react-icons/im";

// Components
import logo from "../assets/BMP_logo.png";
import DashboardCard, { type Task } from "@/utils/DashboardCard";
import AddTaskModal from "@/components/AddTaskModal";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import ViewTaskModal from "@/components/ViewTaskModal";
import DeleteSuccessModal from "@/components/DeletesuccessModal";
import { toast } from "react-toastify";

interface User {
    id: string;
    name: string;
    email: string;
}


function Dashboard() {
    const navigate = useNavigate();

    // User Data State
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [deleteTaskTitle, setDeleteTaskTitle] = useState("");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Checking authentication
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(JSON.parse(storedUser));
            fetchTasks();
        }
    }, [navigate]);

    // For Viewing Task
    const handleViewTask = (task: Task) => {
        setSelectedTask(task);
        setIsViewModalOpen(true);
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get("/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Handles (Modals)
    const handleAddTask = async (title: string, description: string) => {
         try {
            const response = await axios.post("/api/tasks", {
                title, description
            });
            setTasks([response.data, ...tasks]);
         } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task");
         }
    };

    const confirmDelete = (id: string) => {
        setTaskToDelete(id);
        setIsDeleteModalOpen(true);
    }

    // For edit modal
    const openEditModal = (task: Task) => {
        setTaskToEdit(task);
        setIsEditModalOpen(true);
    };

    const handleUpdateTask = async (id: string, title: string, description: string) => {
        try {
            const updatedTask = tasks.map((t) =>
                t._id === id ? { ...t, title, description} : t
            );
            setTasks(updatedTask);

            await axios.put(`/api/tasks/${id}`, {
                title, description
            });
        } catch (error) {
            console.error("Error updating task:", error);
            fetchTasks();
        }
    };

    // Function for deleting
    const executeDelete = async () => {
        if (!taskToDelete) return;

        const task = tasks.find((t) => t._id === taskToDelete);
        const title = task ? task.title : "Task";

        try {
            await axios.delete(`/api/tasks/${taskToDelete}`);
            setTasks(tasks.filter((task) => task._id !== taskToDelete));
            setIsDeleteModalOpen(false);

            setDeleteTaskTitle(title);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setTaskToDelete(null);
        }
    };

    const handleToggleComplete = async (task: Task) => {
        try {
            const newStatus = !task.isCompleted;
            const updatedTasks = tasks.map((t) =>
                t._id === task._id ? { ...t, isCompleted: newStatus} : t);
            setTasks(updatedTasks);

            await axios.put(`/api/tasks/${task._id}`, {
                isCompleted: newStatus,
            });
        } catch (error) {
            console.error("Error updating task:", error);
            fetchTasks();
        }
    };

    const handleLogout = async () => {

        try {
            await axios.post("/api/users/logout");
            localStorage.removeItem("user");
            navigate("/login");
        } catch(error) {
            console.error("Logout failed.",error);
            toast.error("Failed to logout properly.");
        }
    }

    return(
        <div className="bg-linear-to-t from-primary to-bg2 h-screen flex flex-col relative overflow-hidden">

            {/* This is for header section */}
            <header className="flex items-center justify-between px-6 pt-4 pb-8 mt-10">
                {/* Small Logo Div */}
                <div className="bg-bg/20 p-2 rounded-full border border-white">
                    <img src={logo} alt="Bare Minimum Logo" className="w-20 h-20 object-contain" />
                </div>

                {/* Greeting header */}
                <div className="text-right">
                    <p className="text-sm text-txt/800">Ready to barely conquer today?</p>
                    <h2 className="font-bold text-lg text-txt text-center">{user?.name || "User"} ツ</h2>
                </div>
            </header>

            {/* Dashboard */}
            <div className="flex-1 w-full max-w-md px-6 pb-24">
                <div className="bg-bg2/50 backdrop-blur-md w-full h-full rounded-[20px] shadow-lg flex flex-col overflow-hidden border border-white/30">
                    <div className="p-6 text-center border-b border-gray-400/30">
                        <h2 className="text-xl font-normal text-txt">Bare Minimum Tasks</h2>
                        <p className="text-sm text-[#555] italic">“Just enough to survive.”</p>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar max-h-115">
                        {tasks.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-txt/500 opacity-60">
                                <p className="text-lg">"Empty. As intended."</p>
                                <p className="text-3xl mt-2">{'<(￣︶￣)>'}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {tasks.map((task) => (
                                    <div key={task._id}
                                        onClick={() => handleViewTask(task)}
                                        className="cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all duration-200">
                                            <DashboardCard key={task._id}
                                                task={task}
                                                onDelete={confirmDelete}
                                                onToggle={handleToggleComplete}
                                                onEdit={openEditModal} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Nav buttons */}
            <div className="relative bottom-0 w-full">
                <svg 
                  viewBox="0 0 375 80" 
                  className="w-full h-24 drop-shadow-lg" 
                  preserveAspectRatio="none"
                >
                  {/* This path draws the curve/triangle shape */}
                  <path d="M0,80 L0,40 Q187.5,0 375,40 L375,80 Z" fill="#F5F5F5" />
                </svg>
    
                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-end justify-center pb-6 space-x-12">
                    <button className="bg-primary text-white p-3 rounded-xl shadow-md hover:scale-110 transition-transform" 
                        onClick={() => setIsAddModalOpen(true)}>
                        <FaPlus/>
                    </button>
                    <button className="bg-[#EF4444] text-txt p-3 rounded-xl shadow-md hover:scale-110 transition-transform" onClick={handleLogout}>
                        <ImExit/>
                    </button>
                </div>

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
                        onUpdate={handleUpdateTask} />
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