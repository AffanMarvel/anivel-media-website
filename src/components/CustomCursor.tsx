"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, { stiffness: 600, damping: 35 });
  const mouseY = useSpring(0, { stiffness: 600, damping: 35 });

  useEffect(() => {
    // Disable custom cursor on touch devices or screens < 1024px
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor-hover], input, textarea, select, [role='button']");
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        /* Custom Cursor Animation: uiverse.io/bociKond/green-mayfly-76 */
        .uiverse-mayfly-cursor {
          width: 26px;
          height: 26px;
          color: #CB2957;
          position: relative;
          background: radial-gradient(6.5px, currentColor 94%, #0000);
          filter: drop-shadow(0 0 10px rgba(203, 41, 87, 0.75));
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease, color 0.25s ease;
        }

        .uiverse-mayfly-cursor.is-hovered {
          transform: scale(1.35);
          filter: drop-shadow(0 0 18px rgba(203, 41, 87, 0.95)) drop-shadow(0 0 4px #FFFFFF);
          color: #E63968;
        }

        .uiverse-mayfly-cursor:before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(5.8px at bottom right, #0000 94%, currentColor) top left,
                      radial-gradient(5.8px at bottom left, #0000 94%, currentColor) top right,
                      radial-gradient(5.8px at top right, #0000 94%, currentColor) bottom left,
                      radial-gradient(5.8px at top left, #0000 94%, currentColor) bottom right;
          background-size: 13px 13px;
          background-repeat: no-repeat;
          animation: mayfly-cursor-spin 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
        }

        @keyframes mayfly-cursor-spin {
          33% {
            inset: -6.5px;
            transform: rotate(0deg);
          }

          66% {
            inset: -6.5px;
            transform: rotate(90deg);
          }

          100% {
            inset: 0;
            transform: rotate(90deg);
          }
        }
      `}</style>

      {/* Floating Animated Kinetic Cursor Follower */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] flex items-center justify-center select-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className={`uiverse-mayfly-cursor ${isHovered ? "is-hovered" : ""}`} />
      </motion.div>
    </>
  );
};
