"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Edit2, Save, X, Plus, Search, Twitter, Activity, Users, DollarSign, ShoppingCart, Trash2, Palette, Layout, FlagIcon as BorderAll, ImagesIcon as Icons, Sparkles, Layers } from 'lucide-react';
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NumberTicker from "@/components/ui/number-ticker";

const iconList = [
    { name: "Twitter", icon: Twitter },
    { name: "Activity", icon: Activity },
    { name: "Users", icon: Users },
    { name: "DollarSign", icon: DollarSign },
    { name: "ShoppingCart", icon: ShoppingCart },
];

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
            editingValue: "0", // Inclure editingValue
            icon: "Twitter",
        },
    ]);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showIconPicker, setShowIconPicker] = useState<number | null>(null);

    // Style states
    const [gradientStart, setGradientStart] = useState("#4158D0");
    const [gradientEnd, setGradientEnd] = useState("#C850C0");
    const [cardWidth, setCardWidth] = useState(400);
    const [cardBorderColor, setCardBorderColor] = useState("#000000");
    const [cardBorderWidth, setCardBorderWidth] = useState(0);
    const [cardBorderStyle, setCardBorderStyle] = useState("solid");
    const [cardIconSize, setCardIconSize] = useState(24);
    const [cardIconColor, setCardIconColor] = useState("#000000");

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

    const addCounter = () => {
        if (counters.length < 5) {
            setCounters([
                ...counters,
                {
                    id: Date.now(),
                    label: `New Counter ${counters.length + 1}`,
                    value: 0,
                    targetValue: 0,
                    isEditing: false,
                    editingValue: "0", // Ajout de editingValue
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
                counter.id === id ? { ...counter, label: newLabel, isEditing: false } : counter
            )
        );
    };

    const updateCounterValue = (id: number, newValue: string) => {
        const numericValue = parseInt(newValue) || 0;
        setCounters((prevCounters) =>
            prevCounters.map((counter) =>
                counter.id === id ? { ...counter, value: numericValue, editingValue: newValue } : counter
            )
        );
    };

    const updateCounterIcon = (id: number, iconName: string) => {
        setCounters((prevCounters) =>
            prevCounters.map((counter) =>
                counter.id === id ? { ...counter, icon: iconName } : counter
            )
        );
        setShowIconPicker(null);
    };

    const resetAnimation = () => {
        setResetTrigger((prev) => !prev);
    };

    const getCardBorderStyle = () => {
        return {
            border: `${cardBorderWidth}px ${cardBorderStyle} ${cardBorderColor}`,
            width: `${cardWidth}px`,
        };
    };

    const getMainBackgroundStyle = () => {
        return {
            background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
        };
    };

    const IconComponent = ({ iconName, size, color }: { iconName: string; size: number; color: string }) => {
        const Icon = LucideIcons[iconName as keyof typeof LucideIcons];
        return Icon ? <Icon size={size} color={color} /> : null;
    };

    const getCardStyle = () => ({
        width: `${cardWidth}px`,
        border: cardBorderWidth ? `${cardBorderWidth}px ${cardBorderStyle} ${cardBorderColor}` : 'none',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    });

    const getIconContainerStyle = (color: string = '#FFE4E4') => ({
        background: color,
        borderRadius: '50%',
        width: `${cardIconSize + 24}px`,
        height: `${cardIconSize + 24}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    return (
        <div className="min-h-screen bg-gray-100 text-black">
            {/* Top Navigation */}
            <nav className="flex items-center justify-center px-6 py-4 bg-gray-100 border-b border-gray-300">
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                        Remove Watermark
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-colors">
                        Export
                    </button>
                </div>
            </nav>

            <div className="flex">
                {/* Left Sidebar */}
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
                            disabled={counters.length >= 5}
                            className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                        >
                            <Plus size={18} />
                            <span>Add Counter</span>
                        </button>
                        <div className="space-y-2">
                            <h3 className="font-bold">Counters</h3>
                            {counters.map((counter) => (
                                <div key={counter.id} className="bg-white p-3 rounded-lg shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <IconComponent iconName={counter.icon} size={18} color={cardIconColor} />
                                            <span>{counter.label}</span>
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
                                    <input
                                        type="number"
                                        value={counter.editingValue}
                                        onChange={(e) => updateCounterValue(counter.id, e.target.value)}
                                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                                        placeholder="Enter value"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 flex items-center" style={getMainBackgroundStyle()}>
                    <div className={`grid grid-cols-1 gap-6 max-w-xl mx-auto ${
                        counters.length === 1 ? 'self-center' :
                            counters.length === 2 ? 'self-center' :
                                'self-start'
                    }`}>
                        <AnimatePresence>
                            {counters.map((counter) => (
                                <motion.div
                                    key={counter.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    style={getCardStyle()}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div style={getIconContainerStyle()} className="shrink-0">
                                                <IconComponent
                                                    iconName={counter.icon}
                                                    size={cardIconSize}
                                                    color={cardIconColor}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-5xl font-bold mb-2">
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
                                                        className="text-lg text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <h2 className="text-lg text-gray-600">{counter.label}</h2>
                                                        <button
                                                            onClick={() => toggleEditMode(counter.id)}
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Edit2 size={14} className="text-gray-400 hover:text-gray-600" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-80 bg-gray-100 h-[calc(100vh-64px)] p-4 border-l border-gray-300 overflow-y-auto">
                    <div className="space-y-6">
                        {/* Background Settings */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Palette className="w-5 h-5 text-gray-500" />
                                <h3 className="text-sm font-medium">Background Gradient</h3>
                            </div>
                            <div className="space-y-2 pl-7">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <div
                                            className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
                                            style={{background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`}}
                                        />
                                        <input
                                            type="color"
                                            value={gradientStart}
                                            onChange={(e) => setGradientStart(e.target.value)}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="relative flex-1">
                                        <div
                                            className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
                                            style={{background: gradientEnd}}
                                        />
                                        <input
                                            type="color"
                                            value={gradientEnd}
                                            onChange={(e) => setGradientEnd(e.target.value)}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-gray-200 my-6" />

                        {/* Card Settings */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Layout className="w-5 h-5 text-gray-500" />
                                <h3 className="text-sm font-medium">Card Settings</h3>
                            </div>
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
                            </div>
                        </div>
                        <div className="h-px bg-gray-200 my-6" />

                        {/* Border Settings */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <BorderAll className="w-5 h-5 text-gray-500" />
                                <h3 className="text-sm font-medium">Border Settings</h3>
                            </div>
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
                            </div>
                        </div>
                        <div className="h-px bg-gray-200 my-6" />

                        {/* Icon Settings */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Icons className="w-5 h-5 text-gray-500" />
                                <h3 className="text-sm font-medium">Icon Settings</h3>
                            </div>
                            <div className="space-y-4 pl-7">
                                <div className="grid grid-cols-5 gap-2 p-2 bg-white rounded-lg border border-gray-200">
                                    {iconList.map(({ name, icon: Icon }) => (
                                        <button
                                            key={name}
                                            onClick={() => {
                                                if (counters.length > 0) {
                                                    updateCounterIcon(counters[0].id, name);
                                                }
                                            }}
                                            className={`p-2 rounded-lg transition-colors ${
                                                counters[0]?.icon === name ? 'bg-blue-50 text-blue-500' : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon size={24} />
                                        </button>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Size</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="16"
                                            max="48"
                                            value={cardIconSize}
                                            onChange={(e) => setCardIconSize(parseInt(e.target.value, 10))}
                                            className="flex-1"
                                        />
                                        <span className="text-xs text-gray-500 w-12">{cardIconSize}px</span>
                                    </div>
                                    <label className="text-xs text-gray-500">Color</label>
                                    <div className="relative">
                                        <div
                                            className="w-full h-10 rounded-lg cursor-pointer border border-gray-200"
                                            style={{background: cardIconColor}}
                                        />
                                        <input
                                            type="color"
                                            value={cardIconColor}
                                            onChange={(e) => setCardIconColor(e.target.value)}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-gray-200 my-6"/>

                        {/* Animation Settings */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-gray-500"/>
                                <h3 className="text-sm font-medium">Animation</h3>
                            </div>
                            <div className="pl-7">
                                <button
                                    onClick={resetAnimation}
                                    className="w-full px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                                >
                                <RefreshCw size={18} />
                                    <span>Reset Animation</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

