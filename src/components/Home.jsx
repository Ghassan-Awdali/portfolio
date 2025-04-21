import React from "react";
import { TbArrowRightSquare } from "react-icons/tb";
import { Link } from "react-scroll";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      name="home"
      className={`h-screen w-full ${
        isDarkMode
          ? "bg-gradient-to-b from-black via-black to-gray-800 text-white"
          : "bg-gradient-to-b from-white via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Hiyo my name is Ghassan
          </h2>

          <p
            className={`${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } py-4 max-w-2xl`}
          >
            I recently graduated from Dalhousie University , Summer 2024. I
            strive to be an innovator and educator through my work, creating
            meaningful solutions while sharing knowledge with others.
          </p>

          <div>
            <Link
              to="projects"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:scale-110 transition-all duration-300"
            >
              Projects
              <span className="group-hover:rotate-90 duration-300">
                <TbArrowRightSquare size={25} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
