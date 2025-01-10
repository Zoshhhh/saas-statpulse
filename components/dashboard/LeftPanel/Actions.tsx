import React from "react";
import { Plus, ImageIcon, BarChart3, Clock } from "lucide-react";

interface ActionsProps {
    addCounter: () => void;
}

const Actions: React.FC<ActionsProps> = ({ addCounter }) => {
    return (
        <div className="space-y-2">
            <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wider">
                Actions
            </h3>
            <button
                onClick={addCounter}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
                <Plus size={18} />
                <span>Add Counter</span>
            </button>
            <button
                className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2 relative text-gray-600 cursor-not-allowed"
                disabled
            >
                <ImageIcon size={18} />
                <span>Add Screenshot</span>
                <Clock className="absolute right-2 text-blue-500" size={14} />
            </button>
            <button
                className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2 relative text-gray-600 cursor-not-allowed"
                disabled
            >
                <BarChart3 size={18} />
                <span>Add Pool</span>
                <Clock className="absolute right-2 text-blue-500" size={14} />
            </button>
        </div>
    );
};

export default Actions;