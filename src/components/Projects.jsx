import React from "react";
import { useTheme } from "../context/ThemeContext";
import tbd from "../assets/tbd.png";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const portfolios = [
    {
      id: 1,
      src: tbd,
    },
    {
      id: 2,
      src: tbd,
    },
    {
      id: 3,
      src: tbd,
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
        <div className="pb-8 ">
          <p
            className={`text-4xl font-bold inline border-b-4 ${
              isDarkMode ? "border-gray-500" : "border-gray-600"
            }`}
          >
            Projects
          </p>
          <p className="py-6 ">I will be posting some of my projects soon!</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
          {portfolios.map(({ id, src }) => (
            <div
              key={id}
              className={`shadow-md rounded-lg ${
                isDarkMode ? "shadow-gray-600" : "shadow-gray-400"
              }`}
            >
              <img
                src={src}
                alt=""
                className="rounded-md duration-200 hover:scale-105"
              />
              <div className="flex items-center justify-center">
                <button
                  className={`w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Demo
                </button>
                <button
                  className={`w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
