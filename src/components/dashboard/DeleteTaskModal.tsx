import { useState } from "react";
import { FaDove } from "react-icons/fa6";
import type { DeleteTaskModalProps } from "@/types/dashboard";

function DeleteTaskModal({ isOpen, onClose, onConfirm }: DeleteTaskModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 py-4 backdrop-blur-sm sm:items-center sm:px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-[24px] border-4 border-[#357abd] bg-linear-to-t from-primary to-bg2 p-6 text-center shadow-2xl sm:rounded-[30px] sm:p-8">
        <div className="text-5xl text-white drop-shadow-md sm:text-6xl">
          <FaDove />
        </div>

        <div>
          <h2 className="text-2xl font-bold leading-snug text-white drop-shadow-sm">
            Send this task to
            <br />
            heaven?
          </h2>
        </div>

        <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 rounded-[20px] bg-bg py-3 font-medium text-txt shadow-[0_4px_0_rgb(0,0,0,0.2)] transition hover:bg-white active:translate-y-1 active:shadow-none"
          >
            {loading ? "..." : "Yes"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-[20px] bg-bg py-3 font-medium text-txt shadow-[0_4px_0_rgb(0,0,0,0.2)] transition hover:bg-white active:translate-y-1 active:shadow-none"
          >
            {loading ? "..." : "No"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskModal;
