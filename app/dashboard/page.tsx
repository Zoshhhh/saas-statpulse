"use client";
import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import LeftPanel from "@/components/LeftPanel/LeftPanel";
import MainContent from "@/components/MainContent";
import SettingsPanel from "@/components/SettingsPanel";
import { Clock } from "lucide-react";
import html2canvas from "html2canvas";
// import gifshot from "gifshot";

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
      label: "Hours",
      value: 0,
      targetValue: 24,
      isEditing: false,
      editingValue: "35",
      icon: "Clock",
    },
  ]);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showIcon, setShowIcon] = useState(true);
  const [iconPosition, setIconPosition] = useState<"left" | "right">("left");
  const [useRainbowBorder, setUseRainbowBorder] = useState(false);

  // Style states
  const [backgroundType, setBackgroundType] = useState<"gradient" | "solid">(
    "gradient"
  );
  const [solidColor, setSolidColor] = useState("#4158D0");
  const [selectedGradient, setSelectedGradient] = useState(0);
  const gradientPresets = [
    { start: "#4158D0", end: "#C850C0" },
    { start: "#0093E9", end: "#80D0C7" },
    { start: "#8EC5FC", end: "#E0C3FC" },
    { start: "#85FFBD", end: "#FFFB7D" },
    { start: "#FF9A8B", end: "#FF6A88" },
  ];
  const [cardWidth, setCardWidth] = useState(430);
  const [cardHeight, setCardHeight] = useState(220);
  const [cardBorderColor, setCardBorderColor] = useState("#000000");
  const [cardBorderWidth, setCardBorderWidth] = useState(0);
  const [cardBorderStyle, setCardBorderStyle] = useState("solid");
  const [cardIconSize, setCardIconSize] = useState(50);
  const [cardIconColor, setCardIconColor] = useState("#FFFFFF");
  const [cardShadowColor, setCardShadowColor] = useState("#FFFFFF");
  const [cardShadowIntensity, setCardShadowIntensity] = useState(50);
  const [cardIconBackgroundColor, setCardIconBackgroundColor] =
    useState("#8B5CF6");
  const [cardTextSize, setCardTextSize] = useState(21);
  const [cardTextAlign, setCardTextAlign] = useState<
    "left" | "center" | "right"
  >("center");
  const [cardBorderPosition, setCardBorderPosition] = useState<
    "inside" | "outside"
  >("outside");

  // New state variables for main content
  const [mainContentWidth, setMainContentWidth] = useState(600);
  const [mainContentHeight, setMainContentHeight] = useState(600);
  const [mainContentBorderRadius, setMainContentBorderRadius] = useState(20);
  const [isExporting] = useState(false);

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
        counter.id === id
          ? { ...counter, isEditing: !counter.isEditing }
          : counter
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
        counter.id === id
          ? { ...counter, targetValue: numericValue, editingValue: newValue }
          : counter
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

  const getMainBackgroundStyle = () => {
    const style: React.CSSProperties = {
      width: `${mainContentWidth}px`,
      height: `${mainContentHeight}px`,
      borderRadius: `${mainContentBorderRadius}px`,
      transition: "all 0.3s ease",
      overflowY: "auto",
      overflowX: "hidden",
    };

    if (backgroundType === "solid") {
      style.background = solidColor;
    } else {
      const { start, end } = gradientPresets[selectedGradient];
      style.background = `linear-gradient(135deg, ${start}, ${end})`;
    }

    return style;
  };

  const IconComponent = ({
    iconName,
    size,
    color,
  }: {
    iconName: string;
    size: number;
    color: string;
  }) => {
    const Icon = LucideIcons[
      iconName as keyof typeof LucideIcons
    ] as React.ElementType;
    return Icon ? <Icon size={size} color={color} /> : null;
  };

  const getCardStyle = () => ({
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
    border:
      cardBorderPosition === "inside"
        ? `${
            useRainbowBorder
              ? 0
              : cardBorderWidth
              ? `${cardBorderWidth}px`
              : "0px"
          } ${cardBorderStyle} ${cardBorderColor}`
        : "none",
    outline:
      cardBorderPosition === "outside"
        ? `${
            useRainbowBorder
              ? 0
              : cardBorderWidth
              ? `${cardBorderWidth}px`
              : "0px"
          } ${cardBorderStyle} ${cardBorderColor}`
        : "none",
    outlineOffset: cardBorderPosition === "outside" ? "0px" : "initial",
    background: "white",
    borderRadius: "16px",
    boxShadow: `0 0 ${cardShadowIntensity}px ${cardShadowColor}`,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    padding:
      cardBorderPosition === "inside"
        ? `${
            useRainbowBorder
              ? 0
              : cardBorderWidth
              ? `${cardBorderWidth}px`
              : "0px"
          }`
        : "0px",
  });

  const getIconContainerStyle = () => ({
    background: cardIconBackgroundColor,
    borderRadius: "50%",
    width: `${cardIconSize + 24}px`,
    height: `${cardIconSize + 24}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const exportToGif = async () => {
    // setIsExporting(true);
  };

  const exportToPng = async () => {
    const element = document.querySelector(".main-content");
    if (element) {
      const canvas = await html2canvas(element as HTMLElement);
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = "counters.png";
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <nav className="flex items-center justify-center px-6 py-4 bg-gray-100 border-b border-gray-300">
        <div className="flex items-center space-x-4">
          {/* Export GIF Button */}
          <button
            onClick={exportToGif}
            disabled={isExporting}
            className={`px-4 py-2 text-white text-sm flex items-center justify-center space-x-2 rounded-md transition-colors ${
              isExporting
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement; // Type assertion
              if (!isExporting) {
                target.classList.add("cursor-not-allowed", "bg-blue-300");
              }
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement; // Type assertion
              if (!isExporting) {
                target.classList.remove("cursor-not-allowed", "bg-blue-300");
              }
            }}
          >
            {isExporting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  />
                </svg>
                <span>Exporting GIF...</span>
              </>
            ) : (
              <>
                <span>Export GIF</span>
                <Clock className="text-white" size={14} />
              </>
            )}
          </button>

          {/* Export PNG Button */}
          <button
            onClick={exportToPng}
            className="px-4 py-2 bg-green-500 text-white text-sm hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 rounded-md"
          >
            <span>Export PNG</span>
          </button>
        </div>
      </nav>
      <div className="flex">
        <LeftPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          addCounter={addCounter}
          counters={counters}
          toggleEditMode={toggleEditMode}
          removeCounter={removeCounter}
          updateCounterValue={updateCounterValue}
          IconComponent={IconComponent}
          cardIconColor={cardIconColor}
        />
        <MainContent
          getMainBackgroundStyle={getMainBackgroundStyle}
          counters={counters}
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
        <SettingsPanel
          backgroundType={backgroundType}
          setBackgroundType={setBackgroundType}
          solidColor={solidColor}
          setSolidColor={setSolidColor}
          selectedGradient={selectedGradient}
          setSelectedGradient={setSelectedGradient}
          gradientPresets={gradientPresets}
          mainContentWidth={mainContentWidth}
          setMainContentWidth={setMainContentWidth}
          mainContentHeight={mainContentHeight}
          setMainContentHeight={setMainContentHeight}
          mainContentBorderRadius={mainContentBorderRadius}
          setMainContentBorderRadius={setMainContentBorderRadius}
          cardWidth={cardWidth}
          setCardWidth={setCardWidth}
          cardHeight={cardHeight}
          setCardHeight={setCardHeight}
          cardBorderColor={cardBorderColor}
          setCardBorderColor={setCardBorderColor}
          cardBorderWidth={cardBorderWidth}
          setCardBorderWidth={setCardBorderWidth}
          cardBorderStyle={cardBorderStyle}
          setCardBorderStyle={setCardBorderStyle}
          cardBorderPosition={cardBorderPosition}
          setCardBorderPosition={setCardBorderPosition}
          useRainbowBorder={useRainbowBorder}
          setUseRainbowBorder={setUseRainbowBorder}
          cardShadowColor={cardShadowColor}
          setCardShadowColor={setCardShadowColor}
          cardShadowIntensity={cardShadowIntensity}
          setCardShadowIntensity={setCardShadowIntensity}
          showIcon={showIcon}
          setShowIcon={setShowIcon}
          iconPosition={iconPosition}
          setIconPosition={setIconPosition}
          cardIconSize={cardIconSize}
          setCardIconSize={setCardIconSize}
          cardIconColor={cardIconColor}
          setCardIconColor={setCardIconColor}
          cardIconBackgroundColor={cardIconBackgroundColor}
          setCardIconBackgroundColor={setCardIconBackgroundColor}
          cardTextSize={cardTextSize}
          setCardTextSize={setCardTextSize}
          cardTextAlign={cardTextAlign}
          setCardTextAlign={setCardTextAlign}
          resetAnimation={resetAnimation}
          updateCounterIcon={updateCounterIcon}
          counters={counters}
        />
      </div>
    </div>
  );
}
