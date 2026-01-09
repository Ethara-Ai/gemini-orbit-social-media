import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Moon, Sun, Users, Menu } from 'lucide-react';
import { currentUser } from '../data/mockData';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orbit-400 to-orbit-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orbit-500/20 group-hover:scale-105 transition-transform">
              O
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Orbit
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/connections">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Connections</span>
            </Button>
          </Link>
          
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-10 h-10 p-0 rounded-full">
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <Link to="/profile">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
};

