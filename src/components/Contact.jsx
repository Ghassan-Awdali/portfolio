import React from "react";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      name="contact"
      className={`w-full min-h-screen p-4 pt-20 md:pt-0 ${
        isDarkMode
          ? "bg-gradient-to-b from-black to-gray-800 text-white"
          : "bg-gradient-to-b from-white to-gray-200 text-gray-900"
      }`}
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p
            className={`text-4xl font-bold inline border-b-4 ${
              isDarkMode ? "border-gray-500" : "border-gray-600"
            }`}
          >
            Contact
          </p>
          <p className="py-6">Submit the form below to get in touch with me</p>
        </div>

        <div className="sm:flex sm:justify-center sm:items-center flex justify-center items-center">
          <form
            action="https://getform.io/f/61c99527-2b15-42cf-9b55-ad37d2f7daa6"
            method="POST"
            className="flex flex-col w-full md:w-1/2"
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={`p-2 border-2 rounded-md focus:outline-none ${
                isDarkMode
                  ? "bg-transparent text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className={`my-4 p-2 border-2 rounded-md focus:outline-none ${
                isDarkMode
                  ? "bg-transparent text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <textarea
              name="message"
              placeholder="Enter your message"
              rows="10"
              className={`p-2 border-2 rounded-md focus:outline-none ${
                isDarkMode
                  ? "bg-transparent text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            ></textarea>

            <button className="text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Connect!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
