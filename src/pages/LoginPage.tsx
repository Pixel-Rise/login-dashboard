import React, { useState, useEffect } from 'react';
import { FaPalette, FaSun, FaMoon, FaAdjust } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import uz from '../locales/uz.json';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import themes from '../theme';

const translations: Record<string, typeof uz> = { uz, en, ru };

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [texts, setTexts] = useState(translations[language]);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    const browserLanguage = navigator.language.slice(0, 2);
    const selectedLanguage = translations[browserLanguage] ? browserLanguage : 'en';
    setLanguage(selectedLanguage);
    setTexts(translations[selectedLanguage]);
  }, []);

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950">
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <button
          onClick={() => setIsThemeModalOpen(!isThemeModalOpen)}
          className="transition duration-300 flex items-center justify-center"
        >
          <FaPalette className="text-gray-400 hover:text-white" />
        </button>
        {isThemeModalOpen && (
          <div className="absolute top-16 right-4 bg-zinc-900 p-4 rounded-lg shadow-lg w-64 theme-modal">
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
                  onClick={() => {
                    setTheme(themeKey);
                    setIsThemeModalOpen(false);
                  }}
                  className={`w-10 h-10 rounded-full border-2 ${theme === themeKey ? 'border-white' : 'border-gray-300'}`}
                  style={{ backgroundColor: themes[themeKey]?.hex }}
                  title={themeKey}
                />
              ))}
            </div>
          </div>
        )}
        <select
          value={language}
          onChange={(e) => {
            const lang = e.target.value;
            setLanguage(lang);
            setTexts(translations[lang]);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none appearance-none text-white"
        >
          <option value="uz">O'zbek</option>
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </select>
      </div>
      <div className="bg-zinc-900 rounded-lg shadow-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">{texts.login}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-50"
              placeholder={texts.enterEmail}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-50"
              placeholder={texts.enterPassword}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-transparent border ${themes[theme]?.border} ${themes[theme]?.text} py-2 px-4 rounded-lg hover:${themes[theme]?.text} hover:text-white hover:border-white transition duration-300`}
          >
            {texts.login}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          <a href="#" className={`${themes[theme].text} hover:text-white`}>{texts.forgotPassword}</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
