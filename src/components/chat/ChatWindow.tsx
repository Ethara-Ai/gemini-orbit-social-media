import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Send, Image as ImageIcon, MoreVertical, Phone, Video } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { Message, User } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ChatWindowProps {
  partner: User;
  messages: Message[];
  onSendMessage: (content: string, type: 'text' | 'image') => void;
  isTyping: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ partner, messages, onSendMessage, isTyping }) => {
  const [text, setText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text, 'text');
    setText('');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Avatar src={partner.avatar} alt={partner.name} size="md" isOnline={partner.isOnline} />
          <div>
            <div className="font-bold text-gray-900 dark:text-white">{partner.name}</div>
            <div className="text-xs text-gray-500">
              {partner.isOnline ? 'Active now' : 'Offline'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-gray-50 dark:bg-black/50">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === currentUser.id;
          const showAvatar = !isMe && (index === 0 || messages[index - 1].senderId !== msg.senderId);

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", isMe ? "justify-end" : "justify-start")}
            >
              {!isMe && (
                <div className="w-8 flex-shrink-0">
                  {showAvatar && <Avatar src={partner.avatar} alt={partner.name} size="sm" />}
                </div>
              )}
              
              <div className={cn(
                "max-w-[70%] rounded-2xl p-3 shadow-sm",
                isMe 
                  ? "bg-orbit-500 text-white rounded-tr-none" 
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none"
              )}>
                {msg.type === 'text' ? (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                ) : (
                  <img src={msg.content} alt="Attachment" className="rounded-lg max-w-full" />
                )}
                <div className={cn(
                  "text-[10px] mt-1 text-right opacity-70",
                  isMe ? "text-white/80" : "text-gray-400"
                )}>
                  {format(new Date(msg.timestamp), 'h:mm a')}
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
             <div className="w-8 flex-shrink-0">
               <Avatar src={partner.avatar} alt={partner.name} size="sm" />
             </div>
             <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 rounded-tl-none shadow-sm flex gap-1">
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orbit-500">
            <ImageIcon className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
             <input
               type="text"
               value={text}
               onChange={(e) => setText(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Type a message..."
               className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2.5 px-4 focus:ring-2 focus:ring-orbit-500 transition-shadow"
             />
          </div>
          <Button 
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-10 h-10 rounded-full p-0 flex items-center justify-center bg-orbit-500 hover:bg-orbit-600 text-white shadow-lg shadow-orbit-500/30"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

