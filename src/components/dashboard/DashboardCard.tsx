import { FaClock, FaPen, FaTrash } from "react-icons/fa6";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import type { DashboardCardProps } from "@/types/dashboard";

function DashboardCard({
  task,
  onDelete,
  onToggle,
  onEdit,
}: DashboardCardProps) {
  const dueDate = task.dueAt ? new Date(task.dueAt) : null;
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
            className={`block wrap-break-word text-sm font-bold sm:text-base ${
              task.isCompleted ? "text-gray-400 line-through" : "text-black"
            }`}
          >
            {task.title}
          </span>
          {dueDate && !Number.isNaN(dueDate.getTime()) && (
            <span
              className="mt-1 flex items-center gap-1 text-xs font-medium text-gray-500"
            >
              <FaClock aria-hidden="true" />
              Due {dueDate.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
            </span>
          )}
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-1 text-gray-600 sm:gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 hover:text-black"
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
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-red-50 hover:text-red-500"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;
