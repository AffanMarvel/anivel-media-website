"use client";

import React from "react";
import { motion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
      transition={{
        duration: 0.45,
        ease: editorialEase,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
