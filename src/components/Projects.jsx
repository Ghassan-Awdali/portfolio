import React, { useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, useInView } from "framer-motion";
import mazePic from "../assets/maze.png";
import indiebuffPic from "../assets/indiebuff.png";
import tbd from "../assets/tbd.png";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  const portfolios = [
    {
      id: 1,
      src: indiebuffPic,
      title: "IndieBuff - Empowering Game Developers",
      description:
        "Co-founded IndieBuff, a platform connecting indie game studios with players. Led the development of multiple landing pages and contributed to core software development, creating an innovative solution for game discovery.",
      tech: "React, Next.js, Tailwind CSS, Node.js, Lua, C#, C++",
      demo: "https://www.indiebuff.ai/",
      code: null,
    },
    {
      id: 2,
      src: mazePic,
      title: "Haskell Maze Generator & Solver",
      description:
        "A binary maze solving algorithm implemented in Haskell. This project demonstrates functional programming concepts and pathfinding algorithms, creating and solving complex mazes.",
      tech: "Haskell, Algorithms, Functional Programming",
      demo: null,
      code: "https://github.com/Ghassan-Awdali/Haskell-Maze",
    },
    {
      id: 3,
      src: tbd,
      title: "Coming Soon",
      description: "More projects coming soon!",
      tech: "",
      demo: null,
      code: null,
    },
  ];

  return (
    <div
      name="projects"
      className={`relative z-10 flex min-h-screen w-full overflow-hidden py-20 md:py-24 ${
        isDarkMode ? "bg-transparent text-white" : "bg-transparent text-gray-900"
      }`}
      ref={ref}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-screen-lg flex-col justify-center p-4">
        <motion.div
          className="pb-12 md:pb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className={`text-4xl font-bold inline border-b-4 ${
              isDarkMode
                ? "border-gray-500 text-white"
                : "border-gray-600 text-gray-900"
            }`}
          >
            Projects
          </p>
          <p
            className={`py-6 text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Check out some of my work
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {portfolios.map(
            ({ id, src, title, description, tech, demo, code }) => (
              <motion.div
                key={id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className={`shadow-lg rounded-lg overflow-hidden backdrop-blur-sm ${
                  isDarkMode
                    ? "bg-gray-800/50 shadow-gray-600/50 border border-gray-700/50"
                    : "bg-white/80 shadow-gray-400/50 border border-gray-200/50"
                }`}
              >
                <div className="flex flex-col items-center overflow-hidden">
                  <motion.img
                    src={src}
                    alt={title}
                    className="rounded-md w-full h-48 object-contain my-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm mb-4 leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {description}
                  </p>
                  {tech && (
                    <p
                      className={`text-xs mb-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <span className="font-semibold">Technologies:</span>{" "}
                      {tech}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-3">
                    {demo && (
                      <motion.a
                        href={demo}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2.5 text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-white shadow-lg shadow-purple-500/50 text-sm md:text-base"
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {code && (
                      <motion.a
                        href={code}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2.5 text-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white shadow-lg shadow-cyan-500/50 text-sm md:text-base"
                      >
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
