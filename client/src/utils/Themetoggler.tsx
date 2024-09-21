import { useEffect, useState } from 'react';
import darkIcon from '../assets/moon.svg';
import lightIcon from '../assets/sunny.svg';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' && localStorage.theme ? localStorage.theme : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className="p-2  rounded">
      {theme === 'dark' ? (
        <div>
          <img src={darkIcon} className="h-4 w-4 object-cover rounded-full" alt="User" />
        </div>
      ) : (
        <div>
          <img src={lightIcon} className="h-4 w-4 object-cover rounded-full" alt="User" />
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;
