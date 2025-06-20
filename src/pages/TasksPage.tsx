import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import uz from '../locales/uz.json';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

const translations: Record<string, typeof uz> = { uz, en, ru };

const TasksPage: React.FC = () => {
  const userEmail = "matsalayev@outlook.com"; // Example email
  const userName = "Azizbek"; // Example user name
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { language } = useLanguage();
  const { theme } = useTheme();

  const texts = translations[language];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          <section>
            <h1 className="text-2xl font-bold mb-4">{texts.tasks}</h1>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TasksPage;
