import { AnimatePresence, motion } from "framer-motion";
import type { ViewTaskModalProps } from "@/types/dashboard";

const ViewTaskModal = ({ isOpen, task, onClose }: ViewTaskModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && task && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40  backdrop-blur-sm"
          />

          {/* Viewing Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-bg w-full max-w-sm rounded-[30px] p-8 shadow-2xl text-center"
          >
            <h3 className="text-gray-400 uppercase text-sm font-bold tracking-widest mb-4">
              Bare Minimum Task
            </h3>
            <p className="text-3xl font-bold text-gray-800 wrap-break-words mb-8 ">
              {task?.title}
            </p>
            <p className="text-sm font-semibold text-gray-800 wrap-break-words mb-8 italic">
              {task?.description}
            </p>
            <button
              onClick={onClose}
              className="w-full bg-primary text-bg py-3 rounded-2xl font-bold hover:backdrop-opacity-90 transition-opacity"
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
