import React from "react";
import { motion } from "framer-motion";
import { Trash2, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { fadeInLeft, hoverScale, hoverScaleLarge, rotateAnimation, springTransition } from "../utils/animations";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={springTransition}
      className="bg-white fixed w-full z-10 dark:bg-gray-800 shadow-md transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <motion.div
            variants={hoverScale}
            whileHover="hover"
            whileTap="tap"
            onClick={() => reloadPage()}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <motion.div variants={rotateAnimation}>
              <Trash2 className="w- h-8 text-green-500" />
            </motion.div>
            <motion.h1
              variants={fadeInLeft}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"
            >
              RecoTrash
            </motion.h1>
          </motion.div>
          <div className="flex items-center space-x-6 ml-auto">
            <nav className="hidden md:flex items-center space-x-6">
              <motion.a
                variants={hoverScale}
                whileHover="hover"
                href="#upload"
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
              >
                Clasificar
              </motion.a>
              <motion.a
                variants={hoverScale}
                whileHover="hover"
                href="#info"
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
              >
                Aprende
              </motion.a>
              <motion.a
                variants={hoverScale}
                whileHover="hover"
                href="#history"
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
              >
                Historial
              </motion.a>
            </nav>

            <motion.button
              variants={hoverScaleLarge}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
