import { FaPen, FaTrash } from "react-icons/fa6";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

// Define the Task interface here so it can be imported elsewhere if needed
export interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
}

interface DashboardCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
}

function DashboardCard({ task, onDelete, onToggle, onEdit }: DashboardCardProps) { 
  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-[15px] flex items-center justify-between shadow-sm mb-3 group hover:shadow-md transition-all">
      {/* Left: Checkbox & Title */}
      <div className="flex items-center gap-3 overflow-hidden">

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task);
          }}
          className="text-2xl text-black hover:text-primary transition"
        >
          {task.isCompleted ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </button>

        <div className="flex flex-col">
          <span
            className={`font-bold text-sm truncate ${task.isCompleted ? "line-through text-gray-400" : "text-black"}`}
          >
            {task.title}
          </span>
        </div>
      </div>

      {/* Edit and Delete Buttoon */}
      <div className="flex items-center gap-4 text-gray-600">
        <button className="hover:text-black transition" onClick={(e) => {
          e.stopPropagation();
          onEdit(task);
        }}>
          <FaPen size={16} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="hover:text-red-500 transition"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;
