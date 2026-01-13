import React, { useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formStatus, setFormStatus] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
      className={`w-full min-h-screen py-20 md:py-24 relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-b from-black to-gray-800 text-white"
          : "bg-gradient-to-b from-white to-gray-200 text-gray-900"
      }`}
      ref={ref}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDarkMode ? "bg-cyan-400" : "bg-blue-500"
            } opacity-30`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto relative z-10">
        <motion.div
          className="pb-12 md:pb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className={`text-4xl font-bold inline border-b-4 ${
              isDarkMode ? "border-gray-500" : "border-gray-600"
            }`}
          >
            Contact
          </p>
          <p className="py-6 text-lg">
            Submit the form below to get in touch with me
          </p>
        </motion.div>

        <div className="sm:flex sm:justify-center sm:items-center flex justify-center items-center">
          <motion.form
            onSubmit={handleSubmit}
            className={`flex flex-col w-full md:w-1/2 backdrop-blur-sm rounded-lg p-6 ${
              isDarkMode
                ? "bg-gray-800/30 border border-gray-700/50"
                : "bg-white/50 border border-gray-200/50"
            } shadow-xl`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className={`p-3 border-2 rounded-md focus:outline-none transition-all ${
                isDarkMode
                  ? "bg-gray-900/50 text-white border-gray-600 focus:border-cyan-500"
                  : "bg-white/80 text-gray-900 border-gray-300 focus:border-cyan-500"
              }`}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className={`my-4 p-3 border-2 rounded-md focus:outline-none transition-all ${
                isDarkMode
                  ? "bg-gray-900/50 text-white border-gray-600 focus:border-cyan-500"
                  : "bg-white/80 text-gray-900 border-gray-300 focus:border-cyan-500"
              }`}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.textarea
              name="message"
              required
              placeholder="Enter your message"
              rows="10"
              className={`p-3 border-2 rounded-md focus:outline-none transition-all ${
                isDarkMode
                  ? "bg-gray-900/50 text-white border-gray-600 focus:border-cyan-500"
                  : "bg-white/80 text-gray-900 border-gray-300 focus:border-cyan-500"
              }`}
              whileFocus={{ scale: 1.02 }}
            ></motion.textarea>

            <motion.button
              type="submit"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md shadow-lg shadow-cyan-500/50"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(6, 182, 212, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Connect!
            </motion.button>

            {formStatus && (
              <motion.p
                className={`text-center mb-4 ${
                  formStatus.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formStatus}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
