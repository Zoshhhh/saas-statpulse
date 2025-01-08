import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import NumberTicker from "@/components/ui/number-ticker";
import RainbowBorder from '@/components/RainbowBorder';
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

interface Counter {
    id: number;
    label: string;
    value: number;
    targetValue: number;
    isEditing: boolean;
    editingValue: string;
    icon: string;
}

interface MainContentProps {
    getMainBackgroundStyle: () => React.CSSProperties;
    counters: Counter[];
    cardWidth: number;
    useRainbowBorder: boolean;
    cardBorderWidth: number;
    getCardStyle: () => React.CSSProperties;
    showIcon: boolean;
    iconPosition: 'left' | 'right';
    getIconContainerStyle: () => React.CSSProperties;
    IconComponent: React.FC<{ iconName: string; size: number; color: string }>;
    cardIconSize: number;
    cardIconColor: string;
    cardTextSize: number;
    cardTextAlign: 'left' | 'center' | 'right';
    resetTrigger: boolean;
    toggleEditMode: (id: number) => void;
    updateCounterLabel: (id: number, newLabel: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
                                                     getMainBackgroundStyle,
                                                     counters,
                                                     cardWidth,
                                                     useRainbowBorder,
                                                     cardBorderWidth,
                                                     getCardStyle,
                                                     showIcon,
                                                     iconPosition,
                                                     getIconContainerStyle,
                                                     IconComponent,
                                                     cardIconSize,
                                                     cardIconColor,
                                                     cardTextSize,
                                                     cardTextAlign,
                                                     resetTrigger,
                                                     toggleEditMode,
                                                     updateCounterLabel,
                                                 }) => {
    return (
        <div className="flex-1 p-6 flex items-center justify-center overflow-hidden">
            <div
                style={getMainBackgroundStyle()}
                className="main-content flex flex-col items-center justify-center gap-6 p-6 overflow-y-auto max-h-full w-full relative"
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
                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                    <AnimatedGradientText className="text-xs opacity-50">
                        Designed in Statpulse.io
                    </AnimatedGradientText>
                </div>
            </div>
        </div>
    );
};

export default MainContent;

