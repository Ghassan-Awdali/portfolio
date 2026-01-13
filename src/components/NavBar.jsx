import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon, FaArrowUp } from "react-icons/fa";
import { Link } from "react-scroll";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const links = [
    {
      id: 1,
      link: "home",
    },

    {
      id: 2,
      link: "about",
    },

    {
      id: 3,
      link: "projects",
    },

    {
      id: 4,
      link: "contact",
    },
  ];

  const scrollProgress =
    typeof window !== "undefined"
      ? Math.min(
          (scrollY /
            Math.max(
              document.documentElement.scrollHeight - window.innerHeight,
              1
            )) *
            100,
          100
        )
      : 0;

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
      />

      <motion.div
        className={`flex justify-between items-center w-full h-18 px-4 fixed z-40 backdrop-blur-md ${
          isDarkMode
            ? "bg-black/80 text-white border-b border-gray-800"
            : "bg-white/80 text-gray-900 border-b border-gray-200"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="home" smooth duration={500}>
            <h1
              className={`text-5xl font-signature ml-2 cursor-pointer transition-all duration-300 ${
                isDarkMode
                  ? "text-white hover:text-cyan-400"
                  : "text-gray-900 hover:text-cyan-600"
              }`}
            >
              Ghassan
            </h1>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center">
          <ul className="flex">
            {links.map(({ id, link }) => (
              <motion.li
                key={id}
                className="px-4 cursor-pointer capitalize font-medium text-gray-500"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={link} smooth duration={500}>
                  {link}
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-all duration-300"
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
          </motion.button>
        </div>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        <AnimatePresence>
          {nav && (
            <motion.ul
              className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              {links.map(({ id, link }) => (
                <motion.li
                  key={id}
                  className="px-4 cursor-pointer capitalize py-6 text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: id * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    onClick={() => setNav(!nav)}
                    to={link}
                    smooth
                    duration={500}
                  >
                    {link}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg z-50 ${
                isDarkMode
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              }`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default NavBar;
