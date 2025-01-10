import React from "react";
import { Type, ChevronRight, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface TextSettingsProps {
    cardTextSize: number;
    setCardTextSize: (size: number) => void;
    cardTextAlign: "left" | "center" | "right";
    setCardTextAlign: (align: "left" | "center" | "right") => void;
    isExpanded: boolean;
    toggleExpansion: () => void;
}

const TextSettings: React.FC<TextSettingsProps> = ({
                                                       cardTextSize,
                                                       setCardTextSize,
                                                       cardTextAlign,
                                                       setCardTextAlign,
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
                    <Type className="w-5 h-5 text-gray-500" />
                    <h3 className="text-sm font-medium">Text Settings</h3>
                </div>
                <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                        isExpanded ? "transform rotate-90" : ""
                    }`}
                />
            </div>
            {isExpanded && (
                <div className="space-y-2 pl-7">
                    <label className="text-xs text-gray-500">Text Size</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="12"
                            max="36"
                            value={cardTextSize}
                            onChange={(e) => setCardTextSize(parseInt(e.target.value, 10))}
                            className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-12">{cardTextSize}px</span>
                    </div>
                    <label className="text-xs text-gray-500">Text Alignment</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCardTextAlign("left")}
                            className={`flex-1 p-2 rounded-lg ${
                                cardTextAlign === "left" ? "bg-blue-100" : "bg-gray-200"
                            }`}
                        >
                            <AlignLeft size={18} className="mx-auto" />
                        </button>
                        <button
                            onClick={() => setCardTextAlign("center")}
                            className={`flex-1 p-2 rounded-lg ${
                                cardTextAlign === "center" ? "bg-blue-100" : "bg-gray-200"
                            }`}
                        >
                            <AlignCenter size={18} className="mx-auto" />
                        </button>
                        <button
                            onClick={() => setCardTextAlign("right")}
                            className={`flex-1 p-2 rounded-lg ${
                                cardTextAlign === "right" ? "bg-blue-100" : "bg-gray-200"
                            }`}
                        >
                            <AlignRight size={18} className="mx-auto" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextSettings;