import React from "react";
import { useTheme } from "../context/ThemeContext";
import mazePic from "../assets/maze.png";
import tbd from "../assets/tbd.png";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const portfolios = [
    {
      id: 1,
      src: mazePic,
      title: "Binary Haskell Maze Solver",
      description:
        "A maze solving algorithm implemented in Haskell using binary files. This project demonstrates functional programming concepts and pathfinding algorithms, solving complex mazes.",
      tech: "Haskell, Algorithms, Functional Programming",
      demo: null,
      code: "https://github.com/Ghassan-Awdali/Haskell-Maze",
    },
    {
      id: 2,
      src: tbd,
      title: "Coming Soon",
      description: "More projects coming soon!",
      tech: "",
      demo: null,
      code: null,
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
      className={`flex w-full text-white md:h-screen sm:pt-8 ${
        isDarkMode
          ? "bg-gradient-to-b from-black to-gray-800"
          : "bg-gradient-to-b from-white to-gray-200 text-gray-900"
      }`}
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p
            className={`text-4xl font-bold inline border-b-4 ${
              isDarkMode ? "border-gray-500" : "border-gray-600"
            }`}
          >
            Projects
          </p>
          <p className="py-6">Check out some of my work</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
          {portfolios.map(
            ({ id, src, title, description, tech, demo, code }) => (
              <div
                key={id}
                className={`shadow-md rounded-lg ${
                  isDarkMode ? "shadow-gray-600" : "shadow-gray-400"
                }`}
              >
                <img
                  src={src}
                  alt={title}
                  className="rounded-md duration-200 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p
                    className={`text-sm mb-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {description}
                  </p>
                  {tech && (
                    <p
                      className={`text-xs mb-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <span className="font-semibold">Technologies:</span>{" "}
                      {tech}
                    </p>
                  )}
                  <div className="flex items-center justify-center">
                    {demo && (
                      <a
                        href={demo}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 text-center ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Demo
                      </a>
                    )}
                    {code && (
                      <a
                        href={code}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 text-center ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        } bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-white`}
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
