import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Particles = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {[...Array(30)].map((_, i) => {
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const moveX = (Math.random() - 0.5) * 50;
        const moveY = (Math.random() - 0.5) * 50;
        const duration = Math.random() * 20 + 20;

        return (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDarkMode ? "bg-cyan-400" : "bg-blue-500"
            }`}
            style={{
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            initial={{
              opacity: 0.5,
            }}
            animate={{
              x: [0, moveX, moveX * 0.3, 0],
              y: [0, moveY, moveY * 0.3, 0],
              opacity: [0.4, 0.8, 0.6, 0.4],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default Particles;
