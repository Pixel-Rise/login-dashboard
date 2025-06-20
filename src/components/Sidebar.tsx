import { FaUserCircle, FaTachometerAlt, FaTasks, FaCog } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import uz from '../locales/uz.json';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import themes from '../theme';

const translations: Record<string, typeof uz> = { uz, en, ru };

interface SidebarProps {
  userName: string;
  userEmail: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userName, userEmail }) => {
  const navigate = useNavigate();

  const language = localStorage.getItem('language') || 'en';
  const theme = localStorage.getItem('theme') || 'default';

  const texts = translations[language] || translations['en'];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`transition-transform duration-300 translate-x-0 w-64 bg-zinc-900 p-4 fixed h-full`}>
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
          <FaUserCircle size={96} className={`${themes[theme]?.text}`} />
        </div>
        <h2 className="text-lg font-bold text-center">{userName}</h2>
        <p className={`text-sm text-gray-500 text-center`}>{userEmail}</p>
      </div>
      <nav>
        <ul>
          <li className={`mb-2 flex items-center ${window.location.pathname === '/' ? `${themes[theme]?.text}` : 'text-gray-300'}`}>
            <FaTachometerAlt className={`mr-2 ${window.location.pathname === '/' ? `${themes[theme]?.text}` : 'text-gray-300'}`} />
            <Link to="/" className={`${window.location.pathname === '/' ? `${themes[theme]?.text}` : 'text-gray-300'}`}>{texts.dashboard}</Link>
          </li>
          <li className={`mb-2 flex items-center ${window.location.pathname === '/tasks' ? `${themes[theme]?.text}` : 'text-gray-300'}`}>
            <FaTasks className={`mr-2 ${window.location.pathname === '/tasks' ? `${themes[theme]?.text}` : 'text-gray-300'}`} />
            <Link to="/tasks" className={`${window.location.pathname === '/tasks' ? `${themes[theme]?.text}` : 'text-gray-300'}`}>{texts.tasks}</Link>
          </li>
          <li className={`mb-2 flex items-center ${window.location.pathname === '/settings' ? `${themes[theme]?.text}` : 'text-gray-300'}`}>
            <FaCog className={`mr-2 ${window.location.pathname === '/settings' ? `${themes[theme]?.text}` : 'text-gray-300'}`} />
            <Link to="/settings" className={`${window.location.pathname === '/settings' ? `${themes[theme]?.text}` : 'text-gray-300'}`}>{texts.settings}</Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className={`w-[calc(100%-16px)] absolute bottom-4 left-2 bg-transparent border ${themes[theme]?.border} ${themes[theme]?.text} py-2 px-4 rounded-lg hover:${themes[theme]?.text} hover:text-white hover:border-white transition duration-300`}
      >
        {texts.logout}
      </button>
    </div>
  );
};

export default Sidebar;
