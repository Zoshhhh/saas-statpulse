import React from "react";
import RainbowBorder from "@/components/RainbowBorder";
import CounterCard from "./CounterCard";

interface Counter {
    id: number;
    label: string;
    value: number;
    targetValue: number;
    isEditing: boolean;
    editingValue: string;
    icon: string;
}

interface CounterCardWrapperProps {
    counter: Counter;
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

const CounterCardWrapper: React.FC<CounterCardWrapperProps> = ({
                                                                   counter,
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
    const card = (
        <CounterCard
            counter={counter}
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
    );

    return (
        <div className="w-full" style={{ maxWidth: `${cardWidth}px` }}>
            {useRainbowBorder ? (
                <RainbowBorder width={cardBorderWidth} speed={2}>
                    {card}
                </RainbowBorder>
            ) : (
                card
            )}
        </div>
    );
};

export default CounterCardWrapper;