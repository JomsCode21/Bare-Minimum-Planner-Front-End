import { FaPen, FaTrash } from "react-icons/fa6";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import type { DashboardCardProps } from "@/types/dashboard";

function DashboardCard({
  task,
  onDelete,
  onToggle,
  onEdit,
}: DashboardCardProps) {
  return (
    <div className="group mb-3 flex items-start justify-between rounded-[15px] bg-white/90 p-3 shadow-sm backdrop-blur-sm transition-all hover:shadow-md sm:items-center sm:p-4">
      <div className="flex min-w-0 items-start gap-3 overflow-hidden sm:items-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task);
          }}
          className="shrink-0 text-2xl text-black transition hover:text-primary"
        >
          {task.isCompleted ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </button>

        <div className="min-w-0">
          <span
            className={`block break-words text-sm font-bold sm:text-base ${
              task.isCompleted ? "text-gray-400 line-through" : "text-black"
            }`}
          >
            {task.title}
          </span>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-3 text-gray-600 sm:gap-4">
        <button
          type="button"
          className="transition hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
        >
          <FaPen size={16} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="transition hover:text-red-500"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;
