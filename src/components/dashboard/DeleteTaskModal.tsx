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
    //Dark overlay background
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
      {/* Div for modal */}
      <div className="bg-linear-to-t from-primary to-bg2 rounded-[30px] p-8 w-full max-w-[320px] text-center shadow-2xl flex flex-col items-center gap-6 border-4 border-[#357abd]">
        {/* Dove Icon */}
        <div className="text-white text-6xl drop-shadow-md">
          <FaDove />
        </div>

        {/* For text */}
        <div>
          <h2 className="text-2xl font-bold text-white leading-snug drop-shadow-sm">
            Send this task to <br /> heaven?
          </h2>
        </div>

        {/* For Buttons */}
        <div className="flex gap-4 w-full mt-2">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-bg  hover:bg-white text-txt font-medium py-3 rounded-[20px] shadow-[0_4px_0_rgb(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition"
          >
            {loading ? "..." : "Yes"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-bg  hover:bg-white text-txt font-medium py-3 rounded-[20px] shadow-[0_4px_0_rgb(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition"
          >
            {loading ? "..." : "No"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskModal;
