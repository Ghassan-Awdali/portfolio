import React from "react";
import { TbArrowRightSquare } from "react-icons/tb";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div
      name="home"
      className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800 text-white"
    >
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">
            I am a 24 year old Software Engineer
          </h2>

          <p className="text-gray-500 py-4 max-w-2xl">
            I strive to be an innovator and educator through my work, creating
            meaningful solutions while sharing knowledge with others. My passion
            lies in developing technology that makes a difference and helping
            others grow in their journey.
          </p>

          <div>
            <Link
              to="projects"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:scale-105 duration-200"
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
