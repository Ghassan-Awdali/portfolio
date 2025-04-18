import React from "react";
import { useTheme } from "../context/ThemeContext";
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
      className={`flex w-full min-h-screen pt-20 md:pt-0 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-800 to-black text-white"
          : "bg-gradient-to-b from-gray-200 to-white text-gray-900"
      }`}
    >
      <div className="max-w-screen-lg sm:p-0 mx-auto p-4 flex flex-col justify-center w-full h-full mb-8">
        <div>
          <p
            className={`text-4xl font-bold border-b-4 p-2 inline ${
              isDarkMode ? "border-gray-500" : "border-gray-600"
            }`}
          >
            Experience
          </p>
          <p className="py-6">These are the technologies I've worked with</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 text-center py-8 px-4 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style} ${
                isDarkMode ? "bg-transparent" : "bg-white"
              }`}
            >
              <img src={src} alt="" className="w-20 mx-auto" />
              <p className="mt-3">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
