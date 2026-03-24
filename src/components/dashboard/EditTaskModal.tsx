import { useState } from "react";
import type { EditTaskModalProps } from "@/types/dashboard";

function EditTaskModal({
  isOpen,
  onClose,
  task,
  onUpdate,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || loading) return;

    setLoading(true);
    try {
      await onUpdate(task._id, title, description);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 py-4 backdrop-blur-sm sm:items-center sm:px-6">
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-hidden rounded-[24px] border-4 border-[#357abd] bg-linear-to-t from-primary to-bg2 shadow-2xl sm:rounded-[30px]">
        <div className="border-b border-[#6ea8fe] bg-[#8ab4f8] p-4 text-center sm:p-5">
          <h2 className="text-lg font-bold text-txt">
            Polish the Bare Minimum
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex max-h-[calc(100dvh-8rem)] flex-col gap-5 overflow-y-auto p-5 sm:p-6"
        >
          <div>
            <label className="mb-2 ml-2 block text-sm font-bold text-txt">
              Title
            </label>
            <input
              type="text"
              className="w-full rounded-full bg-bg p-3 text-center text-sm outline-none focus:ring-4 focus:ring-[#8ab4f8]"
              placeholder="What I'm Supposed to Do"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 ml-2 block text-sm font-bold text-[#333]">
              Description
            </label>
            <textarea
              className="min-h-24 w-full resize-none rounded-[20px] bg-bg p-3 pt-4 text-center text-sm outline-none focus:ring-4 focus:ring-[#8ab4f8]"
              placeholder="Extra Context (Optional, Obviously)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-bg2 py-3 font-bold text-txt transition hover:bg-white"
            >
              {loading ? "..." : "Update"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-full bg-bg2 py-3 font-bold text-txt transition hover:bg-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
