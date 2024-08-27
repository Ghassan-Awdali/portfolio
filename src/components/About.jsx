import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="flex w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white sm:pt-8"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>

        <p className="text-xl mt-20">
          I’m a passionate software engineer who recently graduated in May 2024
          from Dalhousie. Though I wasn't always able to focus on my career, I'm
          now committed to making my mark in the industry. I’m eager to grow,
          driven by intellectual curiosity and a desire to become highly
          capable.
        </p>

        <br />

        <p className="text-xl">
          Stagnant in the past, I now try my best to embrace every opportunity
          to learn and evolve. My goal is to keep pushing myself until I achieve
          excellence. I'm an aspiring software engineer, determined to become
          someone who stands out.
        </p>
      </div>
    </div>
  );
};

export default About;
