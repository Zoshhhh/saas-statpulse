import React from "react";
import { AnimatePresence } from "framer-motion";
import CounterCardWrapper from "./CounterCardWrapper";
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
    iconPosition: "left" | "right";
    getIconContainerStyle: () => React.CSSProperties;
    IconComponent: React.FC<{ iconName: string; size: number; color: string }>;
    cardIconSize: number;
    cardIconColor: string;
    cardTextSize: number;
    cardTextAlign: "left" | "center" | "right";
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
                        <CounterCardWrapper
                            key={counter.id}
                            counter={counter}
                            cardWidth={cardWidth}
                            useRainbowBorder={useRainbowBorder}
                            cardBorderWidth={cardBorderWidth}
                            getCardStyle={getCardStyle}
                            showIcon={showIcon}
                            iconPosition={iconPosition}
                            getIconContainerStyle={getIconContainerStyle}
                            IconComponent={IconComponent}
                            cardIconSize={cardIconSize}
                            cardIconColor={cardIconColor}
                            cardTextSize={cardTextSize}
                            cardTextAlign={cardTextAlign}
                            resetTrigger={resetTrigger}
                            toggleEditMode={toggleEditMode}
                            updateCounterLabel={updateCounterLabel}
                        />
                    ))}
                </AnimatePresence>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                    <AnimatedGradientText className="text-xs opacity-50">
                        Designed in Statpulse.app
                    </AnimatedGradientText>
                </div>
            </div>
        </div>
    );
};

export default MainContent;