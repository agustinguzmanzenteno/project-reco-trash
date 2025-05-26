import React from "react";
import { Trash2, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <header className="bg-white fixed w-full z-10 dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div
            onClick={() => reloadPage()}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Trash2 className="w-8 h-8 text-green-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              RecoTrash
            </h1>
          </div>
          <div className="flex items-center space-x-6 ml-auto">
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#upload"
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
              >
                Clasificar
              </a>
              <a
                href="#info"
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
              >
                Aprende
              </a>
              <a
                href="#history"
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
              >
                Historial
              </a>
            </nav>

            <button
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
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
