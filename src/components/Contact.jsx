import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://getform.io/f/61c99527-2b15-42cf-9b55-ad37d2f7daa6",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setFormStatus("Message sent successfully!");
        e.target.reset();
        setTimeout(() => setFormStatus(""), 3000); // Clear message after 3 seconds
      } else {
        setFormStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setFormStatus("Error sending message. Please try again.");
    }
  };

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
            onSubmit={handleSubmit}
            className="flex flex-col w-full md:w-1/2"
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className={`p-2 border-2 rounded-md focus:outline-none ${
                isDarkMode
                  ? "bg-transparent text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className={`my-4 p-2 border-2 rounded-md focus:outline-none ${
                isDarkMode
                  ? "bg-transparent text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <textarea
              name="message"
              required
              placeholder="Enter your message"
              rows="10"
              className={`p-2 border-2 rounded-md focus:outline-none ${
                isDarkMode
                  ? "bg-transparent text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            ></textarea>

            <button
              type="submit"
              className="text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300"
            >
              Connect!
            </button>

            {formStatus && (
              <p
                className={`text-center mb-4 ${
                  formStatus.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
