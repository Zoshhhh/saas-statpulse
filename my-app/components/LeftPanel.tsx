import React from 'react';
import { Plus, Search, ImageIcon, BarChart3, Edit2, Trash2 } from 'lucide-react';

interface Counter {
    id: number;
    label: string;
    value: number;
    targetValue: number;
    isEditing: boolean;
    editingValue: string;
    icon: string;
}

interface LeftPanelProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    addCounter: () => void;
    counters: Counter[];
    toggleEditMode: (id: number) => void;
    removeCounter: (id: number) => void;
    updateCounterValue: (id: number, value: string) => void;
    IconComponent: React.FC<{ iconName: string; size: number; color: string }>;
    cardIconColor: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
                                                 searchQuery,
                                                 setSearchQuery,
                                                 addCounter,
                                                 counters,
                                                 toggleEditMode,
                                                 removeCounter,
                                                 updateCounterValue,
                                                 IconComponent,
                                                 cardIconColor,
                                             }) => {
    return (
        <div className="w-80 bg-gray-100 h-[calc(100vh-64px)] p-4 border-r border-gray-300 overflow-y-auto">
            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search templates"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-200 text-black placeholder-gray-500 px-4 py-2 rounded-lg pr-10"
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
                </div>
                <button
                    onClick={addCounter}
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                    <Plus size={18} />
                    <span>Add Counter</span>
                </button>
                <button
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                    <ImageIcon size={18} />
                    <span>Add Screenshot</span>
                </button>
                <button
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                    <BarChart3 size={18} />
                    <span>Add Pool</span>
                </button>
                <div className="space-y-2">
                    <h3 className="font-bold">Elements</h3>
                    {counters.map((counter) => (
                        <div key={counter.id} className="bg-white p-3 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <IconComponent iconName={counter.icon} size={18} color={cardIconColor} />
                                    <span className="font-medium">{counter.label}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => toggleEditMode(counter.id)} className="text-blue-500 hover:text-blue-700">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => removeCounter(counter.id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={counter.targetValue}
                                    onChange={(e) => updateCounterValue(counter.id, e.target.value)}
                                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                                    placeholder="Enter value"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;

