import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { motion } from "framer-motion";

const Socials = () => {
  const links = [
    {
      id: 1,
      label: "LinkedIn",
      icon: <FaLinkedin size={22} className="shrink-0" />,
      href: "https://linkedin.com/in/ghassan-awdali",
      style: "rounded-tr-md",
    },
    {
      id: 2,
      label: "GitHub",
      icon: <FaGithub size={22} className="shrink-0" />,
      href: "https://github.com/ghassan-awdali",
    },
    {
      id: 3,
      label: "Email",
      icon: <HiOutlineMail size={24} className="shrink-0" />,
      href: "mailto:awdalig@gmail.com",
    },
    {
      id: 4,
      label: "Resume",
      icon: <BsFillPersonLinesFill size={22} className="shrink-0" />,
      href: "/resume.pdf",
      style: "rounded-br-md",
      download: true,
    },
  ];

  /** Negative x tucks the strip left; larger magnitude = more hidden. */
  const peekOffset = 10;
  /** On hover, move toward positive x (right) so icons clearly slide out. */
  const hoverRevealPx = 18;

  return (
    <div className="pointer-events-none fixed left-0 top-[35%] z-[45] hidden lg:flex flex-col">
      <ul className="m-0 list-none p-0">
        {links.map(({ id, label, icon, href, style, download }, index) => (
          <motion.li
            key={id}
            className={
              "pointer-events-auto flex h-11 w-11 items-center justify-center border-r border-white/10 shadow-md backdrop-blur-sm " +
              "bg-gradient-to-r from-slate-700/95 to-slate-600/95 " +
              (style ?? "")
            }
            initial={{ x: -peekOffset, opacity: 0 }}
            animate={{ x: -peekOffset, opacity: 1 }}
            whileHover={{
              x: -peekOffset + hoverRevealPx,
              transition: { type: "spring", stiffness: 520, damping: 26, delay: 0 },
            }}
            transition={{
              delay: index * 0.08,
              type: "spring",
              stiffness: 420,
              damping: 30,
            }}
          >
            <a
              href={href}
              title={label}
              aria-label={label}
              className="flex h-full w-full items-center justify-center text-white"
              download={download}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              {icon}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Socials;
