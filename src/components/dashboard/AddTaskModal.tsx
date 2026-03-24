import { useState } from "react";
import type { AddTaskModalProps } from "@/types/dashboard";

function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd(title, description);
      setTitle("");
      setDescription("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 py-4 backdrop-blur-sm sm:items-center sm:px-6">
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-hidden rounded-[24px] border-4 border-[#357abd] bg-linear-to-t from-primary to-bg2 shadow-2xl sm:rounded-[30px]">
        <div className="border-b border-[#6ea8fe] bg-[#8ab4f8] p-4 text-center sm:p-5">
          <h2 className="text-lg font-bold text-txt drop-shadow-sm">
            Add Bare Minimum
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex max-h-[calc(100dvh-8rem)] flex-col gap-5 overflow-y-auto p-5 sm:p-6"
        >
          <div>
            <label className="mb-2 ml-2 block text-sm font-bold text-txt">
              Task
            </label>
            <input
              autoFocus
              type="text"
              placeholder="What I'm Supposed to Do"
              className="w-full rounded-full bg-bg p-3 text-center text-sm font-medium shadow-inner outline-none placeholder-gray-400 focus:ring-4 focus:ring-[#8ab4f8]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 ml-2 block text-sm font-bold text-[#333]">
              Description
            </label>
            <textarea
              placeholder="Extra Context (Optional, Obviously)"
              className="min-h-24 w-full resize-none rounded-[20px] bg-bg p-3 pt-4 text-center text-sm font-medium shadow-inner outline-none placeholder-gray-400 focus:ring-4 focus:ring-[#8ab4f8]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-full bg-bg2 py-3 font-bold text-txt shadow-[0_4px_0_rgb(0,0,0,0.2)] transition hover:bg-white active:translate-y-1 active:shadow-none"
            >
              {isSubmitting ? "..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 rounded-full bg-bg2 py-3 font-bold text-txt shadow-[0_4px_0_rgb(0,0,0,0.2)] transition hover:bg-white active:translate-y-1 active:shadow-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
