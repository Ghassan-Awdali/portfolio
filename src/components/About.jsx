import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="flex w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-white pt-20 md:pt-0"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            About
          </p>
        </div>

        <p className="text-xl mt-10 md:mt-20">
          As a 24-year-old software engineer, I'm driven by the desire to be
          both an innovator and educator in the tech industry. I believe in
          creating solutions that not only solve problems but also inspire and
          teach others.
        </p>

        <br />

        <p className="text-xl">
          My goal is to contribute meaningfully to the tech community by
          developing innovative solutions while sharing knowledge and
          experiences with others. I'm passionate about creating technology that
          makes a difference and helping others learn and grow in their journey.
        </p>
      </div>
    </div>
  );
};

export default About;
