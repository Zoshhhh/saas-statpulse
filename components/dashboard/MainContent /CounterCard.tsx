import React from "react";
import { motion } from "framer-motion";
import NumberTicker from "@/components/ui/number-ticker";
import Image from "next/image";

interface Counter {
  id: number;
  label: string;
  value: number;
  targetValue: number;
  isEditing: boolean;
  editingValue: string;
  icon: string;
}

interface CounterCardProps {
  counter: Counter;
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

const CounterCard: React.FC<CounterCardProps> = ({
  counter,
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
    <motion.div
      key={counter.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      style={getCardStyle()}
      className="w-full"
    >
      <div
        className={`p-6 w-full h-full flex ${
          showIcon
            ? iconPosition === "left"
              ? "flex-row"
              : "flex-row-reverse"
            : ""
        } items-center justify-center`}
      >
        {showIcon && (
          <div style={getIconContainerStyle()} className="shrink-0">
            {counter.icon.startsWith("data") ? (
              <Image
                src={counter.icon}
                alt="Custom icon"
                width={cardIconSize}
                height={cardIconSize}
                style={{ objectFit: "cover", borderRadius: "50%", width: "100%", height: "100%" }}
              />
            ) : (
              <IconComponent
                iconName={counter.icon}
                size={cardIconSize}
                color={cardIconColor}
              />
            )}
          </div>
        )}
        <div
          className={`flex-1 ${showIcon ? "ml-4" : ""} text-${cardTextAlign}`}
        >
          <div
            style={{ fontSize: `${cardTextSize * 2}px` }}
            className="font-bold mb-2"
          >
            <NumberTicker
              key={resetTrigger ? "reset" : "normal"}
              value={counter.value}
              direction="up"
              delay={0}
            />
          </div>
          {counter.isEditing ? (
            <input
              type="text"
              value={counter.label}
              onChange={(e) => updateCounterLabel(counter.id, e.target.value)}
              onBlur={() => toggleEditMode(counter.id)}
              className="text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none"
              style={{ fontSize: `${cardTextSize}px` }}
              autoFocus
            />
          ) : (
            <h2
              className="text-gray-600"
              style={{ fontSize: `${cardTextSize}px` }}
            >
              {counter.label}
            </h2>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CounterCard;
