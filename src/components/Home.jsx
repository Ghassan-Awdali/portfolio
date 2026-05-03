import React, { useState, useEffect } from "react";
import { TbArrowRightSquare } from "react-icons/tb";
import { Link } from "react-scroll";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { NightMoon } from "./Celestial";

const Home = ({ homeScrollTargetRef, onCelestialIntroComplete }) => {
  const { isDarkMode } = useTheme();
  const reduceMotion = Boolean(useReducedMotion());
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hello my name is Ghassan";

  useEffect(() => {
    if (!isDarkMode) {
      const t = window.setTimeout(() => onCelestialIntroComplete?.(), 120);
      return () => window.clearTimeout(t);
    }
  }, [isDarkMode, onCelestialIntroComplete]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={homeScrollTargetRef}
      name="home"
      className={`relative z-10 h-screen w-full overflow-hidden ${
        isDarkMode ? "bg-transparent text-white" : "bg-transparent text-gray-900"
      }`}
    >
      {isDarkMode && (
        <NightMoon
          homeScrollTargetRef={homeScrollTargetRef}
          reduceMotion={reduceMotion}
          onIntroComplete={onCelestialIntroComplete}
        />
      )}

      <div className="relative z-10 mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center px-4 md:flex-row">
        <motion.div
          className="flex h-full w-full flex-col items-start justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className={`text-4xl font-bold sm:text-5xl md:text-6xl ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1 inline-block"
            >
              |
            </motion.span>
          </motion.h2>

          <motion.p
            className={`${
              isDarkMode ? "text-gray-300" : "text-slate-800"
            } max-w-2xl py-6 text-base leading-relaxed sm:text-lg md:text-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            I recently graduated from Dalhousie University, Summer 2024. I strive to be an innovator
            and educator through my work, creating meaningful solutions while sharing knowledge with
            others.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Link
              to="projects"
              smooth
              duration={500}
              className="group my-2 flex w-fit cursor-pointer items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-white shadow-lg shadow-cyan-500/50 transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/80"
            >
              Projects
              <motion.span
                className="duration-300 group-hover:rotate-90"
                whileHover={{ scale: 1.2 }}
              >
                <TbArrowRightSquare size={25} className="ml-1" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
