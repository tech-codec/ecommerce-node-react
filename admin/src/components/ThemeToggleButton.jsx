import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {theme === 'dark' ? (
        <FiSun className="text-yellow-500 w-6 h-6" />
      ) : (
        <FiMoon className="text-gray-800 w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggleButton;