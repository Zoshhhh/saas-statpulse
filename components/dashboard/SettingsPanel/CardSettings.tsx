import React from "react";
import { Palette, ChevronRight } from "lucide-react";

interface BackgroundSettingsProps {
    backgroundType: "gradient" | "solid";
    setBackgroundType: (type: "gradient" | "solid") => void;
    solidColor: string;
    setSolidColor: (color: string) => void;
    selectedGradient: number;
    setSelectedGradient: (index: number) => void;
    gradientPresets: { start: string; end: string }[];
    mainContentWidth: number;
    setMainContentWidth: (width: number) => void;
    mainContentHeight: number;
    setMainContentHeight: (height: number) => void;
    mainContentBorderRadius: number;
    setMainContentBorderRadius: (radius: number) => void;
    isExpanded: boolean;
    toggleExpansion: () => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
                                                                   backgroundType,
                                                                   setBackgroundType,
                                                                   solidColor,
                                                                   setSolidColor,
                                                                   selectedGradient,
                                                                   setSelectedGradient,
                                                                   gradientPresets,
                                                                   mainContentWidth,
                                                                   setMainContentWidth,
                                                                   mainContentHeight,
                                                                   setMainContentHeight,
                                                                   mainContentBorderRadius,
                                                                   setMainContentBorderRadius,
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
                    <Palette className="w-5 h-5 text-gray-500" />
                    <h3 className="text-sm font-medium">Background Settings</h3>
                </div>
                <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                        isExpanded ? "transform rotate-90" : ""
                    }`}
                />
            </div>
            {isExpanded && (
                <div className="space-y-2 pl-7">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setBackgroundType("solid")}
                            className={`flex-1 p-2 rounded-lg ${
                                backgroundType === "solid" ? "bg-blue-100" : "bg-gray-200"
                            }`}
                        >
                            Solid
                        </button>
                        <button
                            onClick={() => setBackgroundType("gradient")}
                            className={`flex-1 p-2 rounded-lg ${
                                backgroundType === "gradient" ? "bg-blue-100" : "bg-gray-200"
                            }`}
                        >
                            Gradient
                        </button>
                    </div>
                    {backgroundType === "solid" ? (
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500">Solid Color</label>
                            <input
                                type="color"
                                value={solidColor}
                                onChange={(e) => setSolidColor(e.target.value)}
                                className="w-full h-10 rounded-lg cursor-pointer"
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500">Gradient Presets</label>
                            <div className="grid grid-cols-5 gap-2">
                                {gradientPresets.map((preset, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedGradient(index)}
                                        className={`w-8 h-8 rounded-full ${
                                            selectedGradient === index ? "ring-2 ring-blue-500" : ""
                                        }`}
                                        style={{
                                            background: `linear-gradient(135deg, ${preset.start}, ${preset.end})`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <label className="text-xs text-gray-500">Width</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="400"
                            max="1200"
                            value={mainContentWidth}
                            onChange={(e) => setMainContentWidth(parseInt(e.target.value, 10))}
                            className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-12">
              {mainContentWidth}px
            </span>
                    </div>
                    <label className="text-xs text-gray-500">Height</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="150"
                            max="800"
                            value={mainContentHeight}
                            onChange={(e) =>
                                setMainContentHeight(parseInt(e.target.value, 10))
                            }
                            className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-12">
              {mainContentHeight}px
            </span>
                    </div>
                    <label className="text-xs text-gray-500">Border Radius</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={mainContentBorderRadius}
                            onChange={(e) =>
                                setMainContentBorderRadius(parseInt(e.target.value, 10))
                            }
                            className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-12">
              {mainContentBorderRadius}px
            </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BackgroundSettings;