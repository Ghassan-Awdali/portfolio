import React from 'react'
import { TbArrowRightSquare } from "react-icons/tb";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div name ='home' className='h-screen w-full bg-gradient-to-b from-black via-black to-gray-800 text-white'>
        <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row'>
            <div className='flex flex-col justify-center h-full'>
                <h2 className="text-7xl sm:text-5xl font-bold text-white">I am a 22 years old Software Engineer </h2>

                <p className='text-gray-500 py-4 max-w-2xl'>
                        I approach learning with genuine enthusiasm and a sincere desire to grow. Passionate about technology,
                        I eagerly explore opportunities to expand my knowledge and skills. Embracing each chance to delve into new technologies,
                        my journey is driven by a sincere curiosity and an eagerness to create meaningful contributions.
                     
                </p>

                <div>
                <Link
                    to="projects" smooth duration={500} className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">
                    Projects
                    <span className="group-hover:rotate-90 duration-300">
                        <TbArrowRightSquare size={25} className="ml-1"/>
                    </span>
            </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home