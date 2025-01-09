import React from 'react';
import { Palette, Layout, FlagIcon as BorderAll, Layers, ImagesIcon as Icons, Type, Sparkles, Clock, ChevronRight, AlignLeft, AlignRight, AlignCenter, RefreshCw, Upload } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

interface SettingsPanelProps {
    backgroundType: 'gradient' | 'solid';
    setBackgroundType: (type: 'gradient' | 'solid') => void;
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
    cardWidth: number;
    setCardWidth: (width: number) => void;
    cardHeight: number;
    setCardHeight: (height: number) => void;
    cardBorderColor: string;
    setCardBorderColor: (color: string) => void;
    cardBorderWidth: number;
    setCardBorderWidth: (width: number) => void;
    cardBorderStyle: string;
    setCardBorderStyle: (style: string) => void;
    cardBorderPosition: 'inside' | 'outside';
    setCardBorderPosition: (position: 'inside' | 'outside') => void;
    useRainbowBorder: boolean;
    setUseRainbowBorder: (use: boolean) => void;
    cardShadowColor: string;
    setCardShadowColor: (color: string) => void;
    cardShadowIntensity: number;
    setCardShadowIntensity: (intensity: number) => void;
    showIcon: boolean;
    setShowIcon: (show: boolean) => void;
    iconPosition: 'left' | 'right';
    setIconPosition: (position: 'left' | 'right') => void;
    cardIconSize: number;
    setCardIconSize: (size: number) => void;
    cardIconColor: string;
    setCardIconColor: (color: string) => void;
    cardIconBackgroundColor: string;
    setCardIconBackgroundColor: (color: string) => void;
    cardTextSize: number;
    setCardTextSize: (size: number) => void;
    cardTextAlign: 'left' | 'center' | 'right';
    setCardTextAlign: (align: 'left' | 'center' | 'right') => void;
    resetAnimation: () => void;
    updateCounterIcon: (id: number, iconName: string) => void;
    counters: any[];
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
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
                                                         cardWidth,
                                                         setCardWidth,
                                                         cardHeight,
                                                         setCardHeight,
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
                                                         cardShadowColor,
                                                         setCardShadowColor,
                                                         cardShadowIntensity,
                                                         setCardShadowIntensity,
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
                                                         cardTextSize,
                                                         setCardTextSize,
                                                         cardTextAlign,
                                                         setCardTextAlign,
                                                         resetAnimation,
                                                         updateCounterIcon,
                                                         counters,
                                                     }) => {
    const [expandedSettings, setExpandedSettings] = React.useState<string[]>([]);

    const toggleSettingExpansion = (setting: string) => {
        setExpandedSettings(prev =>
            prev.includes(setting)
                ? prev.filter(s => s !== setting)
                : [...prev, setting]
        );
    };

    const isSettingExpanded = (setting: string) => expandedSettings.includes(setting);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            uploadCustomIcon(file);
        }
    };

    return (
        <div className="w-80 bg-gray-100 h-[calc(100vh-64px)] p-4 border-l border-gray-300 overflow-y-auto">
            <div className="space-y-6">
                {/* Background Settings */}
                <div className="space-y-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSettingExpansion('background')}
                    >
                        <div className="flex items-center gap-2">
                            <Palette className="w-5 h-5 text-gray-500"/>
                            <h3 className="text-sm font-medium">Background Settings</h3>
                        </div>
                        <ChevronRight
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                isSettingExpanded('background') ? 'transform rotate-90' : ''
                            }`}
                        />
                    </div>
                    {isSettingExpanded('background') && (
                        <div className="space-y-2 pl-7">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setBackgroundType('solid')}
                                    className={`flex-1 p-2 rounded-lg ${backgroundType === 'solid' ? 'bg-blue-100' : 'bg-gray-200'}`}
                                >
                                    Solid
                                </button>
                                <button
                                    onClick={() => setBackgroundType('gradient')}
                                    className={`flex-1 p-2 rounded-lg ${backgroundType === 'gradient' ? 'bg-blue-100' : 'bg-gray-200'}`}
                                >
                                    Gradient
                                </button>
                            </div>
                            {backgroundType === 'solid' ? (
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
                                                className={`w-8 h-8 rounded-full ${selectedGradient === index ? 'ring-2 ring-blue-500' : ''}`}
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
                                <span className="text-xs text-gray-500 w-12">{mainContentWidth}px</span>
                            </div>
                            <label className="text-xs text-gray-500">Height</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="150"
                                    max="800"
                                    value={mainContentHeight}
                                    onChange={(e) => setMainContentHeight(parseInt(e.target.value, 10))}
                                    className="flex-1"
                                />
                                <span className="text-xs text-gray-500 w-12">{mainContentHeight}px</span>
                            </div>
                            <label className="text-xs text-gray-500">Border Radius</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={mainContentBorderRadius}
                                    onChange={(e) => setMainContentBorderRadius(parseInt(e.target.value, 10))}
                                    className="flex-1"
                                />
                                <span className="text-xs text-gray-500 w-12">{mainContentBorderRadius}px</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-px bg-gray-200 my-6"/>

                {/* Card Settings */}
                <div className="space-y-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSettingExpansion('card')}
                    >
                        <div className="flex items-center gap-2">
                            <Layout className="w-5 h-5 text-gray-500"/>
                            <h3 className="text-sm font-medium">Card Settings</h3>
                        </div>
                        <ChevronRight
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                isSettingExpanded('card') ? 'transform rotate-90' : ''
                            }`}
                        />
                    </div>
                    {isSettingExpanded('card') && (
                        <div className="space-y-2 pl-7">
                            <label className="text-xs text-gray-500">Width</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="200"
                                    max="800"
                                    value={cardWidth}
                                    onChange={(e) => setCardWidth(parseInt(e.target.value, 10))}
                                    className="flex-1"
                                />
                                <span className="text-xs text-gray-500 w-12">{cardWidth}px</span>
                            </div>
                            <label className="text-xs text-gray-500">Height</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="100"
                                    max="400"
                                    value={cardHeight}
                                    onChange={(e) => setCardHeight(parseInt(e.target.value, 10))}
                                    className="flex-1"
                                />
                                <span className="text-xs text-gray-500 w-12">{cardHeight}px</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="h-px bg-gray-200 my-6"/>

                {/* Border Settings */}
                <div className="space-y-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSettingExpansion('border')}
                    >
                        <div className="flex items-center gap-2">
                            <BorderAll className="w-5 h-5 text-gray-500"/>
                            <h3 className="text-sm font-medium">Border Settings</h3>
                        </div>
                        <ChevronRight
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                isSettingExpanded('border') ? 'transform rotate-90' : ''
                            }`}
                        />
                    </div>
                    {isSettingExpanded('border') && (
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
                                    onChange={(e) => setCardBorderWidth(parseInt(e.target.value, 10))}
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
                                    onClick={() => setCardBorderPosition('inside')}
                                    className={`flex-1 p-2 rounded-lg ${cardBorderPosition === 'inside' ? 'bg-blue-100' : 'bg-gray-200'}`}
                                >
                                    Inside
                                </button>
                                <button
                                    onClick={() => setCardBorderPosition('outside')}
                                    className={`flex-1 p-2 rounded-lg ${cardBorderPosition === 'outside' ? 'bg-blue-100' : 'bg-gray-200'}`}
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
                                <label htmlFor="use-rainbow-border" className="text-sm text-gray-700">Use Rainbow Border</label>
                            </div>
                        </div>
                    )}
                </div>
                <div className="h-px bg-gray-200 my-6"/>

                {/* Shadow Settings */}
                <div className="space-y-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSettingExpansion('shadow')}
                    >
                        <div className="flex items-center gap-2">
                            <Layers className="w-5 h-5 text-gray-500"/>
                            <h3 className="text-sm font-medium">Shadow Settings</h3>
                        </div>
                        <ChevronRight
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                isSettingExpanded('shadow') ? 'transform rotate-90' : ''
                            }`}
                        />
                    </div>
                    {isSettingExpanded('shadow') && (
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
                                    onChange={(e) => setCardShadowIntensity(parseInt(e.target.value, 10))}
                                    className="flex-1"
                                />
                                <span className="text-xs text-gray-500 w-12">{cardShadowIntensity}px</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="h-px bg-gray-200 my-6"/>

                {/* Icon Settings */}
                <div className="space-y-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSettingExpansion('icon')}
                    >
                        <div className="flex items-center gap-2">
                            <Icons className="w-5 h-5 text-gray-500"/>
                            <h3 className="text-sm font-medium">Icon Settings</h3>
                        </div>
                        <ChevronRight
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                isSettingExpanded('icon') ? 'transform rotate-90' : ''
                            }`}
                        />
                    </div>
                    {isSettingExpanded('icon') && (
                        <div className="space-y-4 pl-7">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={showIcon}
                                    onCheckedChange={setShowIcon}
                                    id="show-icon"
                                />
                                <label htmlFor="show-icon" className="text-sm text-gray-700">Show Icon</label>
                            </div>
                            {showIcon && (
                                <>
                                    <div className="grid grid-cols-5 gap-2 p-2 bg-white rounded-lg border border-gray-200">
                                        {counters.map(({id, icon}) => (
                                            <button
                                                key={id}
                                                onClick={() => updateCounterIcon(id, icon)}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    counters[counters.length - 1]?.icon === icon ? 'bg-blue-50 text-blue-500' : 'hover:bg-gray-100'}`}
                                            >
                                                {typeof icon === 'string' && icon.startsWith('data:') ? (
                                                    <img src={icon} alt="Custom icon" className="w-6 h-6" />
                                                ) : (
                                                    <Icons size={24} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-500">Upload Custom Icon</label>
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="custom-icon-upload" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-6 h-6 text-gray-400" />
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="custom-icon-upload" type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-500">Icon Position</label>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIconPosition('left')}
                                                className={`flex-1 p-2 rounded-lg ${iconPosition === 'left' ? 'bg-blue-100' : 'bg-gray-200'}`}
                                            >
                                                <AlignLeft size={18} className="mx-auto" />
                                            </button>
                                            <button
                                                onClick={() => setIconPosition('right')}
                                                className={`flex-1 p-2 rounded-lg ${iconPosition === 'right' ? 'bg-blue-100' : 'bg-gray-200'}`}
                                            >
                                                <AlignRight size={18} className="mx-auto" />
                                            </button>
                                        </div>
                                        <label className="text-xs text-gray-500">Size</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="range"
                                                min="16"
                                                max="64"
                                                value={cardIconSize}
                                                onChange={(e) => setCardIconSize(parseInt(e.target.value, 10))}
                                                className="flex-1"
                                            />
                                            <span className="text-xs text-gray-500 w-12">{cardIconSize}px</span>
                                        </div>
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
                                            onChange={(e) => setCardIconBackgroundColor(e.target.value)}
                                            className="w-full h-10 rounded-lg cursor-pointer"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className="h-px bg-gray-200 my-6"/>

                {/* Text Settings */}
                <div className="space-y-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSettingExpansion('text')}
                    >
                        <div className="flex items-center gap-2">
                            <Type className="w-5 h-5 text-gray-500"/>
                            <h3 className="text-sm font-medium">Text Settings</h3>
                        </div>
                        <ChevronRight
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                isSettingExpanded('text') ? 'transform rotate-90' : ''
                            }`}
                        />
                    </div>
                    {isSettingExpanded('text') && (
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
                                    onClick={() => setCardTextAlign('left')}
                                    className={`flex-1 p-2 rounded-lg ${cardTextAlign === 'left' ? 'bg-blue-100' : 'bg-gray-200'}`}
                                >
                                    <AlignLeft size={18} className="mx-auto" />
                                </button>
                                <button
                                    onClick={() => setCardTextAlign('center')}
                                    className={`flex-1 p-2 rounded-lg ${cardTextAlign === 'center' ? 'bg-blue-100' : 'bg-gray-200'}`}
                                >
                                    <AlignCenter size={18} className="mx-auto" />
                                </button>
                                <button
                                    onClick={() => setCardTextAlign('right')}
                                    className={`flex-1 p-2 rounded-lg ${cardTextAlign === 'right' ? 'bg-blue-100' : 'bg-gray-200'}`}
                                >
                                    <AlignRight size={18} className="mx-auto" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="h-px bg-gray-200 my-6"/>

                {/* Animation Settings */}
                <div className="space-y-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSettingExpansion('animation')}
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-gray-500"/>
                            <h3 className="text-sm font-medium">Animation</h3>
                        </div>
                        <ChevronRight
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                isSettingExpanded('animation') ? 'transform rotate-90' : ''
                            }`}
                        />
                    </div>
                    {isSettingExpanded('animation') && (
                        <div className="pl-7">
                            <button
                                onClick={resetAnimation}
                                className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={18}/>
                                <span>Reset Animation</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;

