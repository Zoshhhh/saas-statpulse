import React from "react";
import { Edit2, Trash2, ChevronRight } from "lucide-react";

interface Counter {
    id: number;
    label: string;
    value: number;
    targetValue: number;
    isEditing: boolean;
    editingValue: string;
    icon: string;
}

interface ElementsProps {
    counters: Counter[];
    toggleEditMode: (id: number) => void;
    removeCounter: (id: number) => void;
    updateCounterValue: (id: number, value: string) => void;
    IconComponent: React.FC<{ iconName: string; size: number; color: string }>;
    cardIconColor: string;
}

const Elements: React.FC<ElementsProps> = ({
                                               counters,
                                               toggleEditMode,
                                               removeCounter,
                                               updateCounterValue,
                                               IconComponent,
                                               cardIconColor,
                                           }) => {
    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wider">
                Elements
            </h3>
            {counters.map((counter) => (
                <div
                    key={counter.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <IconComponent
                                    iconName={counter.icon}
                                    size={18}
                                    color={cardIconColor}
                                />
                            </div>
                            <span className="font-medium text-gray-800 truncate max-w-[160px]">
                                {counter.label}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => toggleEditMode(counter.id)}
                                className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => removeCounter(counter.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            value={counter.targetValue}
                            onChange={(e) =>
                                updateCounterValue(counter.id, e.target.value)
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            placeholder="Enter value"
                        />
                        <ChevronRight className="text-gray-400" size={18} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Elements;