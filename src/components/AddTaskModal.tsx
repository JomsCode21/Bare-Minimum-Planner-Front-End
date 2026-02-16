import { useState } from "react";

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, description: string) => Promise<void>;
}

function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        await onAdd(title, description);
        setLoading(false);
        setTitle("");
        setDescription("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
            <div className="bg-linear-to-t from-primary to-bg2 rounded-[30px] w-full max-w-sm overflow-hidden shadow-2xl border-4 border-[#357abd]">

                {/* Header */}
                <div className="bg-[#8ab4f8] p-4 text-center border-b border-[#6ea8fe]">
                    <h2 className="text-lg font-bold text-txt drop-shadow-sm">Add Bare Minimum</h2>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

                    {/* Title field */}
                    <div>
                        <label className="block text-sm font-bold text-txt mb-2 ml-2">Task</label>
                        <input autoFocus
                            type="text"
                            placeholder="What I'm Supposed to Do"
                            className="w-full bg-bg p-3 rounded-full text-center text-sm outline-none focus:ring-4 focus:ring-[#8ab4f8] shadow-inner placeholder-gray-400 font-medium"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    {/* Description field */}
                    <div>
                        <label className="block text-sm font-bold text-[#333] mb-2 ml-2">Descripton</label>
                        <textarea placeholder="Extra Context (Optional, Obviously)"
                            className="w-full bg-bg p-3 rounded-[20px] text-center text-sm outline-none focus:ring-4 focus:ring-[#8ab4f8] shadow-inner placeholder-gray-400 font-medium resize-none h-20 pt-4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-2">
                        <button type="submit"
                            disabled={loading}
                            className="flex-1 bg-bg2 hover:bg-white text-txt font-bold py-3 rounded-full shadow-[0_4px_0_rgb(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition">
                                {loading ? "..." : "Save"}
                        </button>
                        <button type="button"
                            onClick={onClose}
                            className="flex-1 bg-bg2 hover:bg-white text-txt font-bold py-3 rounded-full shadow-[0_4px_0_rgb(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition">
                                Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTaskModal;