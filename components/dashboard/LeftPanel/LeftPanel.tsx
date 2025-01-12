import React, { useState } from "react";
import { X } from 'lucide-react';
import Actions from "./Actions";
import Elements from "./Elements";

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
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile toggle button */}
            <button
                className="lg:hidden fixed z-50 bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                onClick={togglePanel}
            >
                {isOpen ? <X size={24} /> : <IconComponent iconName="menu" size={24} color="white" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={togglePanel}
                ></div>
            )}

            {/* Left Panel */}
            <div
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-80 bg-gray-50 h-screen lg:h-[calc(100vh-64px)]
                    p-4 border-r border-gray-200 overflow-y-auto
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search templates"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg pr-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <Actions addCounter={addCounter} />
                    <Elements
                        counters={counters}
                        toggleEditMode={toggleEditMode}
                        removeCounter={removeCounter}
                        updateCounterValue={updateCounterValue}
                        IconComponent={IconComponent}
                        cardIconColor={cardIconColor}
                    />
                </div>
            </div>
        </>
    );
};

export default LeftPanel;

