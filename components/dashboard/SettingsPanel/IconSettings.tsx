import React from "react";
import { ImagesIcon as Icons, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export interface IconSettingsProps {
    showIcon: boolean;
    setShowIcon: (show: boolean) => void;
    iconPosition: "left" | "right";
    setIconPosition: (position: "left" | "right") => void;
    cardIconSize: number;
    setCardIconSize: (size: number) => void;
    cardIconColor: string;
    setCardIconColor: (color: string) => void;
    cardIconBackgroundColor: string;
    setCardIconBackgroundColor: (color: string) => void;
    resetAnimation?: () => void;
    isExpanded: boolean;
    toggleExpansion: () => void;
}
const IconSettings: React.FC<IconSettingsProps> = ({
                                                       showIcon,
                                                       setShowIcon,
                                                       iconPosition,
                                                       setIconPosition,
                                                       cardIconSize,
                                                       setCardIconSize,
                                                       cardIconColor,
                                                       setCardIconColor,
                                                       cardIconBackgroundColor,
                                                       setCardIconBackgroundColor,
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
                    <Icons className="w-5 h-5 text-gray-500" />
                    <h3 className="text-sm font-medium">Icon Settings</h3>
                </div>
                <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                        isExpanded ? "transform rotate-90" : ""
                    }`}
                />
            </div>
            {isExpanded && (
                <div className="space-y-4 pl-7">
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={showIcon}
                            onCheckedChange={setShowIcon}
                            id="show-icon"
                        />
                        <label htmlFor="show-icon" className="text-sm text-gray-700">
                            Show Icon
                        </label>
                    </div>
                    {showIcon && (
                        <>
                            <label className="text-xs text-gray-500">Position</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIconPosition("left")}
                                    className={`flex-1 p-2 rounded-lg ${
                                        iconPosition === "left" ? "bg-blue-100" : "bg-gray-200"
                                    }`}
                                >
                                    Left
                                </button>
                                <button
                                    onClick={() => setIconPosition("right")}
                                    className={`flex-1 p-2 rounded-lg ${
                                        iconPosition === "right" ? "bg-blue-100" : "bg-gray-200"
                                    }`}
                                >
                                    Right
                                </button>
                            </div>
                            <label className="text-xs text-gray-500">Size</label>
                            <input
                                type="range"
                                min="16"
                                max="128"
                                value={cardIconSize}
                                onChange={(e) => setCardIconSize(parseInt(e.target.value, 10))}
                                className="w-full"
                            />
                            <label className="text-xs text-gray-500">Color</label>
                            <input
                                type="color"
                                value={cardIconColor}
                                onChange={(e) => setCardIconColor(e.target.value)}
                                className="w-full h-10 rounded-lg cursor-pointer"
                            />
                            <label className="text-xs text-gray-500">Background Color</label>
                            <input
                                type="color"
                                value={cardIconBackgroundColor}
                                onChange={(e) =>
                                    setCardIconBackgroundColor(e.target.value)
                                }
                                className="w-full h-10 rounded-lg cursor-pointer"
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default IconSettings;