import React from "react";
import { Layers, ChevronRight } from "lucide-react";

interface ShadowSettingsProps {
    cardShadowColor: string;
    setCardShadowColor: (color: string) => void;
    cardShadowIntensity: number;
    setCardShadowIntensity: (intensity: number) => void;
    isExpanded: boolean;
    toggleExpansion: () => void;
}

const ShadowSettings: React.FC<ShadowSettingsProps> = ({
                                                           cardShadowColor,
                                                           setCardShadowColor,
                                                           cardShadowIntensity,
                                                           setCardShadowIntensity,
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
                    <Layers className="w-5 h-5 text-gray-500" />
                    <h3 className="text-sm font-medium">Shadow Settings</h3>
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
                        value={cardShadowColor}
                        onChange={(e) => setCardShadowColor(e.target.value)}
                        className="w-full h-10 rounded-lg cursor-pointer"
                    />
                    <label className="text-xs text-gray-500">Intensity</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={cardShadowIntensity}
                            onChange={(e) =>
                                setCardShadowIntensity(parseInt(e.target.value, 10))
                            }
                            className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-12">
              {cardShadowIntensity}px
            </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShadowSettings;