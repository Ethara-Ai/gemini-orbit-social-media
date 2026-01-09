import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, UserPlus, Share2, AtSign } from 'lucide-react';
import { notifications, users } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export const Notifications: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-white fill-current" />;
      case 'comment': return <MessageCircle className="w-4 h-4 text-white fill-current" />;
      case 'follow': return <UserPlus className="w-4 h-4 text-white" />;
      case 'share': return <Share2 className="w-4 h-4 text-white" />;
      case 'mention': return <AtSign className="w-4 h-4 text-white" />;
      default: return null;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'like': return 'bg-red-500';
      case 'comment': return 'bg-blue-500';
      case 'follow': return 'bg-orbit-500';
      case 'share': return 'bg-green-500';
      case 'mention': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <button className="text-sm text-orbit-500 font-medium hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification, index) => {
          const actor = users.find(u => u.id === notification.actorId);
          if (!actor) return null;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn(
                "p-4 flex gap-4 items-center transition-colors",
                !notification.isRead && "bg-orbit-50/50 dark:bg-orbit-900/10"
              )}>
                <div className="relative">
                  <Avatar src={actor.avatar} alt={actor.name} size="md" />
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900",
                    getColor(notification.type)
                  )}>
                    {getIcon(notification.type)}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-bold text-gray-900 dark:text-white mr-1">{actor.name}</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {notification.type === 'like' && 'liked your post'}
                      {notification.type === 'comment' && 'commented: '}
                      {notification.type === 'follow' && 'started following you'}
                      {notification.type === 'share' && 'shared your post'}
                    </span>
                    {notification.content && (
                      <span className="text-gray-500 dark:text-gray-400"> "{notification.content}"</span>
                    )}
                  </div>
                  <div className="text-xs text-orbit-500 mt-1 font-medium">
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                  </div>
                </div>

                {!notification.isRead && (
                  <div className="w-2.5 h-2.5 bg-orbit-500 rounded-full" />
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

