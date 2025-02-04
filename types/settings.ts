import { type LucideIcon } from 'lucide-react';

export interface SettingsSectionProps {
    icon: LucideIcon;
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

export interface SettingsPanelProps {
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
    cardBorderPosition: "inside" | "outside";
    setCardBorderPosition: (position: "inside" | "outside") => void;
    useRainbowBorder: boolean;
    setUseRainbowBorder: (use: boolean) => void;
    cardShadowColor: string;
    setCardShadowColor: (color: string) => void;
    cardShadowIntensity: number;
    setCardShadowIntensity: (intensity: number) => void;
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
    cardTextSize: number;
    setCardTextSize: (size: number) => void;
    cardTextAlign: "left" | "center" | "right";
    setCardTextAlign: (align: "left" | "center" | "right") => void;
    resetAnimation: () => void;
    updateCounterIcon: (id: number, iconName: string) => void;
    counters: Array<{
        id: number;
        icon: string;
    }>;
}

