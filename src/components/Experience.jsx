import React, { useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, useInView } from "framer-motion";
import html from "../assets/html.png";
import python from "../assets/python.png";
import css from "../assets/css.png";
import js from "../assets/javascript.png";
import java from "../assets/java.png";
import php from "../assets/php.png";
import react from "../assets/react.png";
import tailwind from "../assets/tailwind.png";
import sql from "../assets/sql.png";
import c from "../assets/c.png";
import cplus from "../assets/c++.png";
import csharp from "../assets/csharp.png";
import github from "../assets/github.png";

const Experience = () => {
  const { isDarkMode } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
  const techs = [
    {
      id: 1,
      src: html,
      title: "HTML",
      style: "shadow-orange-500",
    },
    {
      id: 2,
      src: css,
      title: "CSS",
      style: "shadow-blue-500",
    },
    {
      id: 3,
      src: js,
      title: "JavaScript",
      style: "shadow-yellow-500",
    },
    {
      id: 4,
      src: tailwind,
      title: "TailWind",
      style: "shadow-sky-500",
    },
    {
      id: 5,
      src: react,
      title: "React",
      style: "shadow-blue-600",
    },
    {
      id: 6,
      src: java,
      title: "Java",
      style: "shadow-red-600",
    },
    {
      id: 7,
      src: python,
      title: "Python",
      style: "shadow-yellow-400",
    },
    {
      id: 8,
      src: sql,
      title: "SQL",
      style: "shadow-blue-300",
    },
    {
      id: 9,
      src: php,
      title: "PHP",
      style: "shadow-purple-300",
    },
    {
      id: 11,
      src: cplus,
      title: "C++",
      style: "shadow-blue-500",
    },
    {
      id: 12,
      src: csharp,
      title: "C#",
      style: "shadow-purple-500",
    },
    {
      id: 13,
      src: github,
      title: "GitHub",
      style: "shadow-gray-400",
    },
  ];

  return (
    <div
      name="experience"
      className={`flex w-full min-h-screen py-20 md:py-24 relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-800 to-black text-white"
          : "bg-gradient-to-b from-gray-200 to-white text-gray-900"
      }`}
      ref={ref}
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

      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full relative z-10">
        <motion.div
          className="pb-12 md:pb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className={`text-4xl font-bold border-b-4 inline ${
              isDarkMode ? "border-gray-500" : "border-gray-600"
            }`}
          >
            Experience
          </p>
          <p className="py-6 text-lg">
            These are the technologies I've worked with
          </p>
        </motion.div>

        <motion.div
          className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techs.map(({ id, src, title, style }) => (
            <motion.div
              key={id}
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 },
              }}
              className={`shadow-lg hover:shadow-xl duration-500 py-4 rounded-lg ${style} ${
                isDarkMode
                  ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200/50"
              }`}
            >
              <motion.img
                src={src}
                alt=""
                className="w-20 mx-auto"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
              <p className="mt-3 font-semibold">{title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
