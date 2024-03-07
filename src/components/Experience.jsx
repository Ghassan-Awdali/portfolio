import React from 'react'
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

    const techs = [
        {
            id: 1,
            src: html,
            title: 'HTML',
            style : 'shadow-orange-500'


        },
        {
            id: 2,
            src: css,
            title: 'CSS',
            style : 'shadow-blue-500'


        },
        {
            id: 3,
            src: js,
            title: 'JavaScript',
            style : 'shadow-yellow-500'


        },
        {
            id: 4,
            src: tailwind,
            title: 'TailWind',
            style : 'shadow-sky-500'


        },
        {
            id: 5,
            src: react,
            title: 'React',
            style : 'shadow-blue-600'


        },
        {
            id: 6,
            src: java,
            title: 'Java',
            style : 'shadow-red-600'


        },
        {
            id: 7,
            src: python,
            title: 'Python',
            style : 'shadow-yellow-400'


        },
        {
            id: 8,
            src: sql,
            title: 'SQL',
            style : 'shadow-blue-300'


        },
        {
            id: 9,
            src: php,
            title: 'PHP',
            style : 'shadow-purple-300'


        },
        {
            id: 11,
            src: cplus,
            title: 'C++',
            style : 'shadow-blue-500'


        },
        {
            id: 12,
            src: csharp,
            title: 'C#',
            style : 'shadow-purple-500'


        },
        {
            id: 13,
            src: github,
            title: 'GitHub',
            style : 'shadow-gray-400'


        },
    ]

  return (
    <div
    name="experience"
    className="flex bg-gradient-to-b from-gray-800 to-black w-full h-screen sm:pt-8"
  >
    <div className="max-w-screen-lg sm:p-0 mx-auto p-4 flex flex-col justify-center w-full h-full text-white mb-8">
      <div>
        <p className=" text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
          Experience
        </p>
        <p className=" py-6">These are the technologies I've worked with</p>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-12 px-4 sm:py-12 sm:px-4 sm:p-0">
        {techs.map(({ id, src, title, style }) => (
          <div
            key={id}
            className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
          >
            <img src={src} alt="" className="w-20 mx-auto" />
            <p className="mt-3">{title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}



export default Experience