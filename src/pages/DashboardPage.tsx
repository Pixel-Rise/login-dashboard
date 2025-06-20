import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import uz from '../locales/uz.json';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import themes from '../theme';
import { format } from 'date-fns';
import { FaClock } from 'react-icons/fa';

const translations: Record<string, typeof uz> = { uz, en, ru };

const DashboardPage: React.FC = () => {
  const userEmail = "matsalayev@outlook.com"; // Example email
  const userName = "Azizbek"; // Example user name
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { language } = useLanguage();
  const { theme } = useTheme();

  const texts = translations[language];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const today = format(new Date(), 'MMMM dd, yyyy');

  return (
    <div className={`flex h-screen bg-zinc-950 text-gray-100`}>
      <div className={`transition-all duration-300 bg-zinc-900 overflow-hidden`}>
        {isSidebarOpen && (
          <Sidebar
            userName={userName}
            userEmail={userEmail}
          />
        )}
      </div>
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <section className="mb-6">
            <h1 className="text-2xl font-bold mb-4">{texts.welcomeMessage}</h1>
            <p className="text-lg">{texts.today}: {today}</p>
          </section>
          <section className="flex justify-end mb-6">
            <div className={`border ${themes[theme]?.border} p-4 rounded-lg shadow-lg w-64 text-gray-100 flex items-center justify-between`}>
              <div>
                <h2 className="text-lg font-bold mr-3">{texts.weeklyHours}</h2>
              </div>
              <span className="text-4xl font-bold mr-2">40</span>
              <FaClock className={themes[theme].text} size={60} />
            </div>
          </section>
          <section>
            {/* Additional content can go here */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
