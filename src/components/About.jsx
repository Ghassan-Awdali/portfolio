import React from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const { isDarkMode } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      name="about"
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

      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full relative z-10">
        <motion.div
          className="pb-12 md:pb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className={`text-4xl font-bold inline border-b-4 ${
              isDarkMode ? "border-gray-500" : "border-gray-600"
            }`}
          >
            About
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            className="text-xl md:text-2xl leading-relaxed mb-6"
            variants={itemVariants}
          >
            As a 24-year-old software engineer, I'm driven by the desire to be
            both an innovator and educator in the tech industry. I believe in
            creating solutions that not only solve problems but also inspire and
            teach others.
          </motion.p>

          <motion.p
            className="text-xl md:text-2xl leading-relaxed"
            variants={itemVariants}
          >
            My goal is to contribute meaningfully to the tech community by
            developing innovative solutions while sharing knowledge and
            experiences with others. I'm passionate about creating technology
            that makes a difference and helping others learn and grow in their
            journey.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
