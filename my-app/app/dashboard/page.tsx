"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Edit2, Save, X, Plus, Search, Twitter, Activity, Users, DollarSign, ShoppingCart, Trash2, Palette, Layout, FlagIcon as BorderAll, ImagesIcon as Icons, Sparkles, Layers, AlignLeft, AlignRight, Type, AlignCenter, ChevronRight, ImageIcon, BarChart3 } from 'lucide-react';
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NumberTicker from "@/components/ui/number-ticker";
import RainbowBorder from '@/components/RainbowBorder';
import { Switch } from "@/components/ui/switch";
import { toPng } from 'html-to-image';
import GIFEncoder from 'gifencoder';
import { createCanvas, loadImage } from 'canvas';

const iconList = [
    { name: "Twitter", icon: Twitter },
    { name: "Activity", icon: Activity },
    { name: "Users", icon: Users },
    { name: "DollarSign", icon: DollarSign },
    { name: "ShoppingCart", icon: ShoppingCart },
] as const;

interface Counter {
    id: number;
    label: string;
    value: number;
    targetValue: number;
    isEditing: boolean;
    editingValue: string;
    icon: string;
}

export default function Dashboard() {
    const [counters, setCounters] = useState<Counter[]>([
        {
            id: 1,
            label: "Twitter Followers",
            value: 0,
            targetValue: 35,
            isEditing: false,
            editingValue: "35",
            icon: "Twitter",
        },
    ]);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showIconPicker, setShowIconPicker] = useState<number | null>(null);
    const [showIcon, setShowIcon] = useState(true);
    const [iconPosition, setIconPosition] = useState<'left' | 'right'>('left');
    const [useRainbowBorder, setUseRainbowBorder] = useState(false);

    // Style statess
    const [backgroundType, setBackgroundType] = useState<'gradient' | 'solid'>('gradient');
    const [solidColor, setSolidColor] = useState("#4158D0");
    const [selectedGradient, setSelectedGradient] = useState(0);
    const gradientPresets = [
        { start: "#4158D0", end: "#C850C0" },
        { start: "#0093E9", end: "#80D0C7" },
        { start: "#8EC5FC", end: "#E0C3FC" },
        { start: "#85FFBD", end: "#FFFB7D" },
        { start: "#FF9A8B", end: "#FF6A88" },
    ];
    const [cardWidth, setCardWidth] = useState(400);
    const [cardHeight, setCardHeight] = useState(150);
    const [cardBorderColor, setCardBorderColor] = useState("#000000");
    const [cardBorderWidth, setCardBorderWidth] = useState(0);
    const [cardBorderStyle, setCardBorderStyle] = useState("solid");
    const [cardIconSize, setCardIconSize] = useState(48);
    const [cardIconColor, setCardIconColor] = useState("#000000");
    const [cardShadowColor, setCardShadowColor] = useState("#FFFFFF");
    const [cardShadowIntensity, setCardShadowIntensity] = useState(5);
    const [cardIconBackgroundColor, setCardIconBackgroundColor] = useState('#FFE4E4');
    const [cardTextSize, setCardTextSize] = useState(21);
    const [cardTextAlign, setCardTextAlign] = useState<'left' | 'center' | 'right'>('center');
    const [cardBorderPosition, setCardBorderPosition] = useState<'inside' | 'outside'>('outside');
    const [cardShadowPosition, setCardShadowPosition] = useState<'inside' | 'outside'>('outside');
    const [expandedSettings, setExpandedSettings] = useState<string[]>([]);

    // New state variables for main content
    const [mainContentWidth, setMainContentWidth] = useState(800);
    const [mainContentHeight, setMainContentHeight] = useState(600);
    const [mainContentBorderRadius, setMainContentBorderRadius] = useState(0);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounters((prevCounters) =>
                prevCounters.map((counter) => {
                    if (counter.value < counter.targetValue) {
                        return { ...counter, value: counter.value + 1 };
                    }
                    return counter;
                })
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const newHeight = Math.max(300, counters.length * 200);
        setMainContentHeight(newHeight);
    }, [counters.length]);

    const addCounter = () => {
        if (counters.length < 4) {
            setCounters([
                ...counters,
                {
                    id: Date.now(),
                    label: `New Counter ${counters.length + 1}`,
                    value: 0,
                    targetValue: 35,
                    isEditing: false,
                    editingValue: "35",
                    icon: "Activity",
                },
            ]);
        }
    };

    const removeCounter = (id: number) => {
        setCounters(counters.filter((counter) => counter.id !== id));
    };

    const toggleEditMode = (id: number) => {
        setCounters((prevCounters) =>
            prevCounters.map((counter) =>
                counter.id === id ? { ...counter, isEditing: !counter.isEditing } : counter
            )
        );
    };

    const updateCounterLabel = (id: number, newLabel: string) => {
        setCounters((prevCounters) =>
            prevCounters.map((counter) =>
                counter.id === id ? { ...counter, label: newLabel } : counter
            )
        );
    };

    const updateCounterValue = (id: number, newValue: string) => {
        const numericValue = parseInt(newValue) || 0;
        setCounters((prevCounters) =>
            prevCounters.map((counter) =>
                counter.id === id ? { ...counter, targetValue: numericValue, editingValue: newValue } : counter
            )
        );
    };

    const updateCounterIcon = (id: number, iconName: string) => {
        setCounters((prevCounters) =>
            prevCounters.map((counter) =>
                counter.id === id ? { ...counter, icon: iconName } : counter
            )
        );
    };

    const resetAnimation = () => {
        setResetTrigger((prev) => !prev);
    };

    const getCardBorderStyle = () => {
        return {
            border: `${cardBorderWidth}px ${cardBorderStyle} ${cardBorderColor}`,
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
        };
    };

    const getMainBackgroundStyle = () => {
        const style: React.CSSProperties = {
            width: `${mainContentWidth}px`,
            height: `${mainContentHeight}px`,
            borderRadius: `${mainContentBorderRadius}px`,
            transition: 'all 0.3s ease',
            overflowY: 'auto',
            overflowX: 'hidden',
        };

        if (backgroundType === 'solid') {
            style.background = solidColor;
        } else {
            const { start, end } = gradientPresets[selectedGradient];
            style.background = `linear-gradient(135deg, ${start}, ${end})`;
        }

        return style;
    };

    const IconComponent = ({ iconName, size, color }: { iconName: string; size: number; color: string }) => {
        const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
        return Icon ? <Icon size={size} color={color} /> : null;
    };

    const getCardStyle = () => ({
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        border: cardBorderPosition === 'inside' ? `${useRainbowBorder ? 0 : (cardBorderWidth ? `${cardBorderWidth}px` : '0px')} ${cardBorderStyle} ${cardBorderColor}` : 'none',
        outline: cardBorderPosition === 'outside' ? `${useRainbowBorder ? 0 : (cardBorderWidth ? `${cardBorderWidth}px` : '0px')} ${cardBorderStyle} ${cardBorderColor}` : 'none',
        outlineOffset: cardBorderPosition === 'outside' ? '0px' : 'initial',
        background: 'white',
        borderRadius: '16px',
        boxShadow: `0 0 ${cardShadowIntensity}px ${cardShadowColor}`,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        padding: cardBorderPosition === 'inside' ? `${useRainbowBorder ? 0 : (cardBorderWidth ? `${cardBorderWidth}px` : '0px')}` : '0px',
    });

    const getIconContainerStyle = () => ({
        background: cardIconBackgroundColor,
        borderRadius: '50%',
        width: `${cardIconSize + 24}px`,
        height: `${cardIconSize + 24}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    const toggleSettingExpansion = (setting: string) => {
        setExpandedSettings(prev =>
            prev.includes(setting)
                ? prev.filter(s => s !== setting)
                : [...prev, setting]
        );
    };

    const isSettingExpanded = (setting: string) => expandedSettings.includes(setting);

    const exportToGif = async () => {
        setIsExporting(true);
        const mainContent = document.querySelector('.main-content') as HTMLElement;
        if (!mainContent) {
            setIsExporting(false);
            return;
        }

        try {
            const width = mainContent.offsetWidth;
            const height = mainContent.offsetHeight;
            const encoder = new GIFEncoder(width, height);
            encoder.start();
            encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
            encoder.setDelay(500);  // frame delay in ms
            encoder.setQuality(10); // image quality. 10 is default.

            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            for (let i = 0; i < 10; i++) {
                const dataUrl = await toPng(mainContent);
                const image = await loadImage(dataUrl);
                ctx.drawImage(image, 0, 0, width, height);
                encoder.addFrame(ctx as any);
            }

            encoder.finish();
            const buffer = encoder.out.getData();
            const blob = new Blob([buffer], { type: 'image/gif' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'dashboard-export.gif';
            link.click();
        } catch (error) {
            console.error('Error exporting to GIF:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToPng = async () => {
        setIsExporting(true);
        const mainContent = document.querySelector('.main-content') as HTMLElement;
        if (!mainContent) {
            setIsExporting(false);
            return;
        }

        try {
            const dataUrl = await toPng(mainContent);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'dashboard-export.png';
            link.click();
        } catch (error) {
            console.error('Error exporting to PNG:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-black">
            <nav className="flex items-center justify-center px-6 py-4 bg-gray-100 border-b border-gray-300">
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                        Remove Watermark
                    </button>
                    <button
                        onClick={exportToGif}
                        disabled={isExporting}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isExporting ? 'Exporting...' : 'Export GIF'}
                    </button>
                    <button
                        onClick={exportToPng}
                        disabled={isExporting}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isExporting ? 'Exporting...' : 'Export PNG'}
                    </button>
                </div>
            </nav>

            <div className="flex">
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

                <div className="flex-1 p-6 flex items-center justify-center overflow-hidden">
                    <div
                        style={getMainBackgroundStyle()}
                        className="main-content flex flex-col items-center justify-center gap-6 p-6 overflow-y-auto max-h-full w-full"
                    >
                        <AnimatePresence>
                            {counters.map((counter) => (
                                <div key={counter.id} className="w-full" style={{ maxWidth: `${cardWidth}px` }}>
                                    {useRainbowBorder ? (
                                        <RainbowBorder width={cardBorderWidth} speed={2}>
                                            <motion.div
                                                key={counter.id}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -50 }}
                                                style={getCardStyle()}
                                                className="w-full"
                                            >
                                                <div className={`p-6 w-full h-full flex ${showIcon ? (iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse') : ''} items-center justify-center`}>
                                                    {showIcon && (
                                                        <div style={getIconContainerStyle()} className="shrink-0">
                                                            <IconComponent
                                                                iconName={counter.icon}
                                                                size={cardIconSize}
                                                                color={cardIconColor}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className={`flex-1 ${showIcon ? 'ml-4' : ''} text-${cardTextAlign}`}>
                                                        <div className={`font-bold mb-2`} style={{ fontSize: `${cardTextSize * 2}px` }}>
                                                            <NumberTicker
                                                                key={resetTrigger ? "reset" : "normal"}
                                                                value={counter.value}
                                                            />
                                                        </div>
                                                        {counter.isEditing ? (
                                                            <input
                                                                type="text"
                                                                value={counter.label}
                                                                onChange={(e) => updateCounterLabel(counter.id, e.target.value)}
                                                                onBlur={() => toggleEditMode(counter.id)}
                                                                className={`text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-${cardTextAlign}`}
                                                                style={{ fontSize: `${cardTextSize}px` }}
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            <h2 className="text-gray-600" style={{ fontSize: `${cardTextSize}px` }}>{counter.label}</h2>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </RainbowBorder>
                                    ) : (
                                        <motion.div
                                            key={counter.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -50 }}
                                            style={getCardStyle()}
                                            className="w-full"
                                        >
                                            <div className={`p-6 w-full h-full flex ${showIcon ? (iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse') : ''} items-center justify-center`}>
                                                {showIcon && (
                                                    <div style={getIconContainerStyle()} className="shrink-0">
                                                        <IconComponent
                                                            iconName={counter.icon}
                                                            size={cardIconSize}
                                                            color={cardIconColor}
                                                        />
                                                    </div>
                                                )}
                                                <div className={`flex-1 ${showIcon ? 'ml-4' : ''} text-${cardTextAlign}`}>
                                                    <div className={`font-bold mb-2`} style={{ fontSize: `${cardTextSize * 2}px` }}>
                                                        <NumberTicker
                                                            key={resetTrigger ? "reset" : "normal"}
                                                            value={counter.value}
                                                        />
                                                    </div>
                                                    {counter.isEditing ? (
                                                        <input
                                                            type="text"
                                                            value={counter.label}
                                                            onChange={(e) => updateCounterLabel(counter.id, e.target.value)}
                                                            onBlur={() => toggleEditMode(counter.id)}
                                                            className={`text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-${cardTextAlign}`}
                                                            style={{ fontSize: `${cardTextSize}px` }}
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <h2 className="text-gray-600" style={{ fontSize: `${cardTextSize}px` }}>{counter.label}</h2>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="w-80 bg-gray-100 h-[calc(100vh-64px)] p-4 border-l border-gray-300 overflow-y-auto">
                    <div className="space-y-6">
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
                                    <label className="text-xstext-gray-500">Color</label>
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
                                                {iconList.map(({name, icon: Icon}) => (
                                                    <button
                                                        key={name}
                                                        onClick={() => {
                                                            if (counters.length > 0) {
                                                                updateCounterIcon(counters[counters.length - 1].id, name);
                                                            }
                                                        }}
                                                        className={`p-2 rounded-lg transition-colors ${
                                                            counters[counters.length - 1]?.icon === name ? 'bg-blue-50 text-blue-500' : 'hover:bg-gray-100'}`}
                                                    >
                                                        <Icon size={40}/>
                                                    </button>
                                                ))}
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
            </div>
        </div>
    );
}

