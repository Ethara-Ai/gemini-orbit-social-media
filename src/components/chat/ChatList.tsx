import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation, users, currentUser } from '../../data/mockData';
import { Avatar } from '../ui/Avatar';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ChatListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ conversations, activeId, onSelect }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-orbit-500 transition-shadow"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {conversations.map((chat) => {
          const otherUserId = chat.participants.find(id => id !== currentUser.id);
          const otherUser = users.find(u => u.id === otherUserId);
          
          if (!otherUser) return null;

          return (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => onSelect(chat.id)}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50",
                activeId === chat.id && "bg-orbit-50 dark:bg-orbit-900/10 border-r-4 border-orbit-500"
              )}
            >
              <Avatar src={otherUser.avatar} alt={otherUser.name} size="md" isOnline={otherUser.isOnline} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={cn("font-medium truncate", activeId === chat.id ? "text-orbit-600 dark:text-orbit-400" : "text-gray-900 dark:text-white")}>
                    {otherUser.name}
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {formatDistanceToNow(new Date(chat.lastMessage.timestamp), { addSuffix: false })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={cn("text-sm truncate", chat.unreadCount > 0 ? "text-gray-900 dark:text-white font-semibold" : "text-gray-500")}>
                    {chat.lastMessage.senderId === currentUser.id && 'You: '}
                    {chat.lastMessage.content}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-orbit-500 text-white text-xs flex items-center justify-center ml-2 flex-shrink-0">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

