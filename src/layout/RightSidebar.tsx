import React from 'react';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { users } from '../data/mockData';

export const RightSidebar: React.FC = () => {
  const onlineUsers = users.filter(u => u.isOnline && u.id !== 'current-user');
  const suggestedUsers = users.filter(u => !u.isOnline && u.id !== 'current-user').slice(0, 2);

  return (
    <div className="hidden xl:flex flex-col gap-6 sticky top-24 h-[calc(100vh-6rem)]">
      <Card className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Who's Online</h3>
        <div className="flex flex-col gap-4">
          {onlineUsers.map(user => (
            <div key={user.id} className="flex items-center gap-3 group cursor-pointer">
              <Avatar src={user.avatar} alt={user.name} size="sm" isOnline />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white truncate group-hover:text-orbit-500 transition-colors">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500 truncate">{user.handle}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Suggested for you</h3>
        <div className="flex flex-col gap-4">
          {suggestedUsers.map(user => (
            <div key={user.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar src={user.avatar} alt={user.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{user.job}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

