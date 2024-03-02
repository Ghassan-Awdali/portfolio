import React from 'react'
import { TbArrowRightSquare } from "react-icons/tb";

const Home = () => {
  return (
    <div name ='home' className='h-screen w-full bg-gradient-to-b from-black via-black to-gray-800 text-white'>
        <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row'>
            <div className='flex flex-col justify-center h-full'>
                <h2 className="text-7xl sm:text-5xl font-bold text-white">I am 22 years old Software Engineer </h2>

                <p className='text-gray-500 py-4 max-w-2xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod tincidunt fermentum. Quisque maximus volutpat nibh,
                     a congue dolor consectetur in. Aliquam quis leo id libero auctor scelerisque quis at sem. Curabitur vitae posuere libero. 
                     Donec sagittis orci non leo blandit, vitae tincidunt dui dignissim. Curabitur vitae elit ut libero sagittis tincidunt 
                     vitae ac metus. Ut tortor est, condimentum et ex et, semper condimentum felis. Ut at eros pulvinar, tempus eros ut, interdum leo.
                     
                </p>

                <div>
                    <button className=' group text-white w-fit px-6 py-3 my-2 flex item-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'>
                        Portfolio
                        <span className = 'group-hover:rotate-90 duration-300'>
                        <TbArrowRightSquare  size={25}/>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home