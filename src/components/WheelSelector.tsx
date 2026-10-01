"use client";

import React, { useState } from "react";

interface WheelSelectorProps {
  activeTier?: string;
  onSelect?: (value: "DEMO" | "CREATIVE" | "BRAND") => void;
  className?: string;
}

/**
 * Interactive 3D Wheel Selector Component
 * Adapted for ANIVEL MEDIA brand styling with #CB2957 crimson accent.
 */
export const WheelSelector: React.FC<WheelSelectorProps> = ({
  activeTier,
  onSelect,
  className = "",
}) => {
  const tierToVal = (tier?: string) => {
    if (tier === "DEMO" || tier === "TRY") return "value-1";
    if (tier === "CREATIVE" || tier === "START" || tier === "COMBOS") return "value-2";
    if (tier === "BRAND" || tier === "GROW") return "value-3";
    return "value-2";
  };

  const valToTier = (val: string): "DEMO" | "CREATIVE" | "BRAND" => {
    if (val === "value-1") return "DEMO";
    if (val === "value-3") return "BRAND";
    return "CREATIVE";
  };

  const [selectedValue, setSelectedValue] = React.useState<string>(tierToVal(activeTier));

  React.useEffect(() => {
    if (activeTier && activeTier !== "ALL") {
      setSelectedValue(tierToVal(activeTier));
    }
  }, [activeTier]);

  const handleChange = (val: string) => {
    setSelectedValue(val);
    if (onSelect) {
      onSelect(valToTier(val));
    }
  };

  return (
    <div className={`wheel-selector-container ${className}`}>
      <style jsx>{`
        .wheel-selector-container {
          --accent: #CB2957;
          --panel-bg: #0C0C10;
          --wheel-bg: #15151C;
          --text-active: #ffffff;
          --text-idle: rgba(255, 255, 255, 0.15);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
        }

        .hint-pop {
          position: absolute;
          top: -32px;
          font-family: var(--font-mono), monospace;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 2px;
          color: #CB2957;
          text-transform: uppercase;
          animation: pulseHint 2s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes pulseHint {
          0%,
          100% {
            opacity: 0.8;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }

        .radio-input {
          position: relative;
          height: 220px;
          width: 210px;
          background: #09090D;
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.7),
            0 0 25px -5px rgba(203, 41, 87, 0.25),
            inset 0 0 15px rgba(0, 0, 0, 0.9);
          transition: border-color 0.3s ease;
        }

        .radio-input:hover {
          border-color: rgba(203, 41, 87, 0.5);
        }

        .radio-input::after {
          content: "";
          position: absolute;
          right: -150px;
          width: 300px;
          height: 300px;
          background: repeating-conic-gradient(
            from 0deg,
            #14141A 0deg 10deg,
            #1A1A22 10deg 20deg
          );
          border-radius: 50%;
          z-index: 1;
          opacity: 0.6;
        }

        .radio-input::before {
          content: "";
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 7px;
          height: 7px;
          background: var(--accent);
          border-radius: 50%;
          z-index: 30;
          box-shadow:
            0 0 15px var(--accent),
            0 0 30px var(--accent);
          pointer-events: none;
        }

        .radio-input input {
          display: none;
        }

        .glass-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.4) 100%
          );
          z-index: 25;
          pointer-events: none;
        }

        .wheel-label {
          position: absolute;
          left: 36px;
          display: flex;
          flex-direction: column;
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          transform-origin: 260px center;
          transform: rotate(var(--angle));
          filter: blur(2px);
          opacity: 0.15;
          z-index: 5;
          cursor: pointer;
        }

        .wheel-label .num {
          font-family: var(--font-mono), monospace;
          font-weight: 900;
          font-size: 0.75rem;
          color: #CB2957;
          margin-bottom: -4px;
        }

        .wheel-label .label {
          font-family: var(--font-display), sans-serif;
          font-weight: 900;
          font-size: 2.1rem;
          color: #fff;
          letter-spacing: -1px;
          text-transform: uppercase;
        }

        .radio-input:has(#wheel-val-1:checked) .wheel-label {
          transform: rotate(calc(var(--angle) + 30deg));
        }
        .radio-input:has(#wheel-val-2:checked) .wheel-label {
          transform: rotate(calc(var(--angle) + 0deg));
        }
        .radio-input:has(#wheel-val-3:checked) .wheel-label {
          transform: rotate(calc(var(--angle) - 30deg));
        }

        .radio-input input:checked + .wheel-label {
          opacity: 1;
          filter: blur(0);
          transform: rotate(0deg) translateX(10px);
          z-index: 10;
        }

        .radio-input input:checked + .wheel-label .label {
          text-shadow: 0 0 25px rgba(203, 41, 87, 0.5);
        }

        .next-trigger {
          position: absolute;
          inset: 0;
          z-index: -1;
          cursor: pointer;
        }

        .radio-input:has(#wheel-val-1:checked) #trigger-for-1,
        .radio-input:has(#wheel-val-2:checked) #trigger-for-2,
        .radio-input:has(#wheel-val-3:checked) #trigger-for-3 {
          z-index: 100;
        }
      `}</style>

      <div className="hint-pop">TAP TO SPIN &bull; SELECT TIER</div>

      <div className="radio-input">
        <label
          htmlFor="wheel-val-2"
          className="next-trigger"
          id="trigger-for-1"
          onClick={() => handleChange("value-2")}
        />
        <label
          htmlFor="wheel-val-3"
          className="next-trigger"
          id="trigger-for-2"
          onClick={() => handleChange("value-3")}
        />
        <label
          htmlFor="wheel-val-1"
          className="next-trigger"
          id="trigger-for-3"
          onClick={() => handleChange("value-1")}
        />

        <div className="glass-overlay" />

        <input
          value="value-1"
          name="value-radio"
          id="wheel-val-1"
          type="radio"
          checked={selectedValue === "value-1"}
          onChange={() => handleChange("value-1")}
        />
        <label
          className="wheel-label"
          htmlFor="wheel-val-1"
          style={{ "--angle": "-30deg" } as React.CSSProperties}
        >
          <span className="num">01</span>
          <span className="label">DEMO</span>
        </label>

        <input
          value="value-2"
          name="value-radio"
          id="wheel-val-2"
          type="radio"
          checked={selectedValue === "value-2"}
          onChange={() => handleChange("value-2")}
        />
        <label
          className="wheel-label"
          htmlFor="wheel-val-2"
          style={{ "--angle": "0deg" } as React.CSSProperties}
        >
          <span className="num">02</span>
          <span className="label">CREATIVE</span>
        </label>

        <input
          value="value-3"
          name="value-radio"
          id="wheel-val-3"
          type="radio"
          checked={selectedValue === "value-3"}
          onChange={() => handleChange("value-3")}
        />
        <label
          className="wheel-label"
          htmlFor="wheel-val-3"
          style={{ "--angle": "30deg" } as React.CSSProperties}
        >
          <span className="num">03</span>
          <span className="label">BRAND</span>
        </label>
      </div>
    </div>
  );
};
