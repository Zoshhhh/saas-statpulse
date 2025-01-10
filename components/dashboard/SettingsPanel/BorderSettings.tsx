import React from "react";
import { FlagIcon as BorderAll, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BorderSettingsProps {
    cardBorderColor: string;
    setCardBorderColor: (color: string) => void;
    cardBorderWidth: number;
    setCardBorderWidth: (width: number) => void;
    cardBorderStyle: string;
    setCardBorderStyle: (style: string) => void;
    cardBorderPosition: "inside" | "outside";
    setCardBorderPosition: (position: "inside" | "outside") => void;
    useRainbowBorder: boolean;
    setUseRainbowBorder: (use: boolean) => void;
    isExpanded: boolean;
    toggleExpansion: () => void;
}

const BorderSettings: React.FC<BorderSettingsProps> = ({
                                                           cardBorderColor,
                                                           setCardBorderColor,
                                                           cardBorderWidth,
                                                           setCardBorderWidth,
                                                           cardBorderStyle,
                                                           setCardBorderStyle,
                                                           cardBorderPosition,
                                                           setCardBorderPosition,
                                                           useRainbowBorder,
                                                           setUseRainbowBorder,
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
                    <BorderAll className="w-5 h-5 text-gray-500" />
                    <h3 className="text-sm font-medium">Border Settings</h3>
                </div>
                <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                        isExpanded ? "transform rotate-90" : ""
                    }`}
                />
            </div>
            {isExpanded && (
                <div className="space-y-2 pl-7">
                    <label className="text-xs text-gray-500">Color</label>
                    <input
                        type="color"
                        value={cardBorderColor}
                        onChange={(e) => setCardBorderColor(e.target.value)}
                        className="w-full h-10 rounded-lg cursor-pointer"
                    />
                    <label className="text-xs text-gray-500">Width</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={cardBorderWidth}
                            onChange={(e) =>
                                setCardBorderWidth(parseInt(e.target.value, 10))
                            }
                            className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-12">{cardBorderWidth}px</span>
                    </div>
                    <label className="text-xs text-gray-500">Style</label>
                    <select
                        value={cardBorderStyle}
                        onChange={(e) => setCardBorderStyle(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                    >
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                        <option value="double">Double</option>
                        <option value="groove">Groove</option>
                    </select>
                    <label className="text-xs text-gray-500">Position</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCardBorderPosition("inside")}
                            className={`flex-1 p-2 rounded-lg ${
                                cardBorderPosition === "inside" ? "bg-blue-100" : "bg-gray-200"
                            }`}
                        >
                            Inside
                        </button>
                        <button
                            onClick={() => setCardBorderPosition("outside")}
                            className={`flex-1 p-2 rounded-lg ${
                                cardBorderPosition === "outside" ? "bg-blue-100" : "bg-gray-200"
                            }`}
                        >
                            Outside
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={useRainbowBorder}
                            onCheckedChange={setUseRainbowBorder}
                            id="use-rainbow-border"
                        />
                        <label htmlFor="use-rainbow-border" className="text-sm text-gray-700">
                            Use Rainbow Border
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BorderSettings;