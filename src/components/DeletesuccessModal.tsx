import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteSuccessModalProps {
    isOpen: boolean;
    taskTitle: string;
    onClose: () => void;
}

const DeleteSuccessModal = ({ isOpen, taskTitle, onClose }: DeleteSuccessModalProps) => {
    const [showAdios, setShowAdios] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setShowAdios(true), 1500);
            return () => {
                clearTimeout(timer);
                setShowAdios(false)
            }
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center">
                    {/* Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{opacity: 0 }}
                        className="absolute inset-0 bg-primary flex flex-col items-center justify-center text-bg" >

                        {/* Cloud */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[250px] mb-30 drop-shadow-lg" >
                                ☁️
                        </motion.div>

                        {/*  Flying Animation */}
                        {!showAdios ? (
                            <motion.h2
                                initial={{ y:100, scale: 1, opacity: 1}}
                                animate={{
                                    y: -100,
                                    scale: 0,
                                    opacity: 0
                                }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="text-3xl font-bold text-center px-4 absolute" >
                                    {taskTitle}
                            </motion.h2>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center text-center z-10" >
                                    <p className="text-2xl italic mb-8 opacity-90">Adios, Obligation.</p>
                                <button
                                    onClick={onClose}
                                    className="bg-bg text-primary px-12 py-3 rounded-full font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-transform" >
                                        Okay
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default DeleteSuccessModal;