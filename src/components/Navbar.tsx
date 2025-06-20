import React, { useState, useEffect } from 'react';
import { FaBars, FaPalette, FaSun, FaMoon, FaAdjust } from 'react-icons/fa';
import themes from '../theme';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);

    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, [setTheme, setLanguage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.querySelector('.theme-modal');
      if (modal && !modal.contains(event.target as Node)) {
        setIsThemeModalOpen(false);
      }
    };

    if (isThemeModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeModalOpen]);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setIsThemeModalOpen(false);
    console.log(`Selected theme: ${selectedTheme}`);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header className={`flex justify-between items-center p-4 bg-zinc-950 text-gray-100`}>
      <button
        onClick={toggleSidebar}
        className="text-gray-400 hover:text-white"
      >
        <FaBars size={20} />
      </button>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsThemeModalOpen(!isThemeModalOpen)}
          className="transition duration-300 flex items-center justify-center"
        >
          <FaPalette className={`text-gray-400 hover:text-white`} />
        </button>
        {isThemeModalOpen && (
          <div className="absolute top-16 right-4 bg-zinc-900 p-4 rounded-lg shadow-lg theme-modal">
            <div className="flex justify-center mb-6">
              <button
                className="px-5 py-4 border border-gray-300 text-gray-300 rounded-lg hover:border-white hover:text-white mr-2"
              >
                <FaSun size={16} />
              </button>
              <button
                className={`px-5 py-4 border ${themes[theme].border} ${themes[theme].text} rounded-lg hover:border-white hover:text-white mr-2`}
              >
                <FaMoon size={16} />
              </button>
              <button
                className="px-5 py-4 border border-gray-300 text-gray-300 rounded-lg hover:border-white hover:text-white"
              >
                <FaAdjust size={16} />
              </button>
            </div>
            <hr className="border-gray-600 mb-6" />
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => handleThemeChange(themeKey)}
                  className={`w-10 h-10 rounded-full border-2 ${theme === themeKey ? 'border-white' : 'border-gray-400'} hover:border-white`}
                  style={{ backgroundColor: themes[themeKey]?.hex }}
                  title={themeKey}
                />
              ))}
            </div>
          </div>
        )}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none appearance-none text-white"
        >
          <option value="uz">O'zbek</option>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
      </div>
    </header>
  );
};

export default Navbar;
