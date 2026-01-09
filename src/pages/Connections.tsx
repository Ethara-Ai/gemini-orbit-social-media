import React, { useState } from 'react';
import { users } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export const Connections: React.FC = () => {
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  const friends = users.filter(u => u.id !== 'current-user'); // In a real app, check friend status
  const suggestions = users.filter(u => u.id !== 'current-user'); // Reusing users for demo

  const handleConnect = (id: string) => {
    setSentRequests(prev => [...prev, id]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 flex items-center gap-4">
                <Avatar src={friend.avatar} alt={friend.name} size="md" isOnline={friend.isOnline} />
                <div className="flex-1">
                  <div className="font-bold text-gray-900 dark:text-white">{friend.name}</div>
                  <div className="text-xs text-gray-500">{friend.job}</div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  Message
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Suggested People</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {suggestions.map((user, index) => (
            <motion.div
              key={`sug-${user.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 flex flex-col items-center text-center gap-3">
                <Avatar src={user.avatar} alt={user.name} size="xl" />
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.location}</div>
                </div>
                
                <div className="text-xs text-gray-400 mb-2">
                  {Math.floor(Math.random() * 20)} mutual connections
                </div>

                <Button 
                  fullWidth 
                  variant={sentRequests.includes(user.id) ? 'secondary' : 'primary'}
                  onClick={() => handleConnect(user.id)}
                  disabled={sentRequests.includes(user.id)}
                >
                  {sentRequests.includes(user.id) ? 'Request Sent' : 'Connect'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

