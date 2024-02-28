import React from 'react'

const About = () => {
  return (
    <div name = "about" className = "w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white">

        <div className = "max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
            <div className="pb-8">
                <p className="text-4xl font-bold inline border-b-4 border-gray-500">About me!</p>
            </div>

            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam ex fugiat nihil odit? Accusamus in labore quae dolor quaerat! Atque suscipit eum quidem dolores in sed eaque tempora magnam? Totam cum in, commodi, pariatur reiciendis molestiae cupiditate nostrum quod accusantium quae quisquam a soluta ducimus deleniti enim! Dolore, dolorem iste!
            </p>

            <br />
            <p className= "text-xl mt-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at enim temporibus, quas amet modi laboriosam, necessitatibus aliquid, eius quibusdam repellendus ducimus nihil cum? Nisi alias quasi aperiam officia nemo sed facere, rem fuga. Laborum, suscipit! Consequuntur qui ad iusto fugiat odit aut, reiciendis quidem laboriosam minima eligendi perferendis itaque.</p>
        </div>
    </div>
  )
}

export default About