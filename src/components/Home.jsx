import React, { useState, useEffect } from "react";
import { TbArrowRightSquare } from "react-icons/tb";
import { Link } from "react-scroll";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const Home = () => {
  const { isDarkMode } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hiyo my name is Ghassan";

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
      name="home"
      className={`h-screen w-full relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-b from-black via-black to-gray-800 text-white"
          : "bg-gradient-to-b from-white via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDarkMode ? "bg-cyan-400" : "bg-blue-500"
            } opacity-30`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row relative z-10">
        <motion.div
          className="flex flex-col justify-center h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1"
            >
              |
            </motion.span>
          </motion.h2>

          <motion.p
            className={`${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } py-6 max-w-2xl text-lg md:text-xl leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            I recently graduated from Dalhousie University, Summer 2024. I
            strive to be an innovator and educator through my work, creating
            meaningful solutions while sharing knowledge with others.
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
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80"
            >
              Projects
              <motion.span
                className="group-hover:rotate-90 duration-300"
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
