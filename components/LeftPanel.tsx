import React from 'react';
import { Plus, Search, ImageIcon, BarChart3, Edit2, Trash2, Clock, ChevronRight } from 'lucide-react';

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
        <div className="w-80 bg-gray-50 h-[calc(100vh-64px)] p-4 border-r border-gray-200 overflow-y-auto">
            <div className="space-y-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search templates"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg pr-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wider">Actions</h3>
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
                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wider">Elements</h3>
                    {counters.map((counter) => (
                        <div key={counter.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <IconComponent iconName={counter.icon} size={18} color={cardIconColor} />
                                    </div>
                                    <span className="font-medium text-gray-800">{counter.label}</span>
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
                                    onChange={(e) => updateCounterValue(counter.id, e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter value"
                                />
                                <ChevronRight className="text-gray-400" size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;

