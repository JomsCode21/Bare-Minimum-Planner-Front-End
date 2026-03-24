import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCloud } from "react-icons/fa6";
import type { DeleteSuccessModalProps } from "@/types/dashboard";

const DeleteSuccessModal = ({
  isOpen,
  taskTitle,
  onClose,
}: DeleteSuccessModalProps) => {
  const [showAdios, setShowAdios] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowAdios(true), 1500);
      return () => {
        clearTimeout(timer);
        setShowAdios(false);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-primary px-4 text-bg"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12 text-[140px] drop-shadow-lg sm:mb-16 sm:text-[220px]"
            >
              <FaCloud />
            </motion.div>

            {!showAdios ? (
              <motion.h2
                initial={{ y: 100, scale: 1, opacity: 1 }}
                animate={{ y: -100, scale: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute px-4 text-center text-2xl font-bold sm:text-3xl"
              >
                {taskTitle}
              </motion.h2>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="z-10 flex flex-col items-center text-center"
              >
                <p className="mb-8 text-xl italic opacity-90 sm:text-2xl">
                  Adios, Obligation.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-bg px-8 py-3 text-lg font-bold text-primary shadow-xl transition-transform hover:scale-105 active:scale-95 sm:px-12 sm:text-xl"
                >
                  Okay
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteSuccessModal;
