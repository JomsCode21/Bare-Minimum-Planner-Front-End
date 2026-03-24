import { AnimatePresence, motion } from "framer-motion";
import type { ViewTaskModalProps } from "@/types/dashboard";

const ViewTaskModal = ({ isOpen, task, onClose }: ViewTaskModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && task && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md rounded-[24px] bg-bg p-6 text-center shadow-2xl sm:rounded-[30px] sm:p-8"
          >
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
              Bare Minimum Task
            </h3>
            <p className="mb-6 break-words text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl">
              {task.title}
            </p>
            <p className="mb-8 break-words text-sm font-semibold italic text-gray-800">
              {task.description}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl bg-primary py-3 font-bold text-bg transition-opacity hover:opacity-90"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ViewTaskModal;
