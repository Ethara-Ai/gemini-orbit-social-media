import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, MessageSquare, Bell, User, BarChart2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { currentUser } from '../data/mockData';
import { cn } from '../lib/utils';

export const Sidebar: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: MessageSquare, label: 'Chats', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="hidden lg:flex flex-col gap-6 sticky top-24 h-[calc(100vh-6rem)]">
      <Card className="p-6 flex flex-col items-center text-center">
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="xl" className="mb-4" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{currentUser.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{currentUser.job}</p>
        
        <div className="flex items-center justify-center gap-6 w-full border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="text-center">
            <div className="font-bold text-gray-900 dark:text-white">{currentUser.stats.followers}</div>
            <div className="text-xs text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900 dark:text-white">{currentUser.stats.following}</div>
            <div className="text-xs text-gray-500">Following</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-medium">
          <BarChart2 className="w-4 h-4 text-orbit-500" />
          <span>Analytics</span>
        </div>
        <div className="h-16 flex items-end justify-between gap-1">
          {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
            <div
              key={i}
              className="w-full bg-orbit-100 dark:bg-orbit-900/30 rounded-t-sm relative group"
            >
              <div 
                className="absolute bottom-0 left-0 right-0 bg-orbit-500 rounded-t-sm transition-all duration-500 ease-out group-hover:bg-orbit-400"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="text-xs text-center text-gray-500 mt-2">Weekly Engagement</div>
      </Card>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-orbit-500 text-white shadow-md shadow-orbit-500/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-900 hover:text-orbit-500 dark:hover:text-orbit-400"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

