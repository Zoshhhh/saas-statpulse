import React from "react";
import { Sparkles, ChevronRight, RefreshCw } from "lucide-react";

interface AnimationSettingsProps {
    resetAnimation: () => void;
    isExpanded: boolean;
    toggleExpansion: () => void;
}

const AnimationSettings: React.FC<AnimationSettingsProps> = ({
                                                                 resetAnimation,
                                                                 isExpanded,
                                                                 toggleExpansion,
                                                             }) => {
    return (
        <div className="space-y-3">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleExpansion}
            >
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gray-500" />
                    <h3 className="text-sm font-medium">Animation</h3>
                </div>
                <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                        isExpanded ? "transform rotate-90" : ""
                    }`}
                />
            </div>
            {isExpanded && (
                <div className="pl-7">
                    <button
                        onClick={resetAnimation}
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} />
                        <span>Reset Animation</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnimationSettings;