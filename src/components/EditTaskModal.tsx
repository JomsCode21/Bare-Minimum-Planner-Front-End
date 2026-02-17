import { useState } from "react";
import { type Task } from "@/utils/DashboardCard";

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
    onUpdate: (id: string, title: string, description: string) => Promise<void>;
}

function EditTaskModal({ isOpen, onClose, task, onUpdate }: EditTaskModalProps) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!task) return;

        setLoading(true);
        await onUpdate(task._id, title, description);
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
            <div className="bg-linear-to-t from-primary to-bg2 rouded-[20px] w-full max-w-sm overflow-hidden shadow-2xl border-4 border-[#357abd] rounded-[20px]">

                <div className="bg-[#8ab4f8] p-4 text-center border-b border-[#6ea8fe]">
                    <h2 className="text-lg font-bold text-txt">Polish the Bare Minimum</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-bold text-txt mb-2 ml-2">Title</label>
                        <input type="text"
                            className="w-full bg-bg p-3 rounded-full text-center text-sm outline-none focus:ring-4 focus:ring-[#8ab4f8]"
                            placeholder="What I'm Supposed to Do"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#333] mb-2 ml-2">Description</label>
                        <textarea
                            className="w-full bg-bg p-3 rounded-[20px] text-center text-sm outline-none focus:ring-4 focus:ring-[#8ab4f8] resize-none h-20 pt-4"
                            placeholder="Extra Context (Optional, Obviously)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="flex gap-4 mt-2">
                        <button type="submit"
                            disabled={loading}
                            className="flex-1 bg-bg2 hover:bg-white text-txt font-bold py-3 rounded-full transition">
                                {loading ? "..." : "Update"}
                        </button>
                        <button type="button"
                            onClick={onClose}
                            className="flex-1 bg-bg2 hover:bg-white text-txt font-bold py-3 rounded-full transition">
                                Cancel
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTaskModal;