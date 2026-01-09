import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { initialConversations, users, currentUser } from '../data/mockData';
import { Message } from '../types';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';
import { v4 as uuidv4 } from 'uuid';

export const Messages: React.FC = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState<string | null>(initialConversations[0].id);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'chat1': [initialConversations[0].lastMessage],
    'chat2': [initialConversations[1].lastMessage],
  });
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});

  const activeConversation = conversations.find(c => c.id === activeId);
  const activePartnerId = activeConversation?.participants.find(id => id !== currentUser.id);
  const activePartner = users.find(u => u.id === activePartnerId);

  const handleSendMessage = (content: string, type: 'text' | 'image') => {
    if (!activeId) return;

    const newMessage: Message = {
      id: uuidv4(),
      senderId: currentUser.id,
      receiverId: activePartnerId!,
      content,
      timestamp: new Date().toISOString(),
      type,
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => 
      c.id === activeId 
        ? { ...c, lastMessage: newMessage }
        : c
    ));

    setIsTyping(prev => ({ ...prev, [activeId]: true }));
    setTimeout(() => {
      const reply: Message = {
        id: uuidv4(),
        senderId: activePartnerId!,
        receiverId: currentUser.id,
        content: `That's interesting! Tell me more about "${content}".`,
        timestamp: new Date().toISOString(),
        type: 'text',
        status: 'delivered'
      };

      setIsTyping(prev => ({ ...prev, [activeId!]: false }));
      setMessages(prev => ({
        ...prev,
        [activeId!]: [...(prev[activeId!] || []), reply]
      }));
       setConversations(prev => prev.map(c => 
        c.id === activeId 
          ? { ...c, lastMessage: reply }
          : c
      ));
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      <Card className={cn(
        "flex-1 md:w-80 md:flex-none flex flex-col overflow-hidden",
        activeId ? "hidden md:flex" : "flex"
      )}>
        <ChatList 
          conversations={conversations} 
          activeId={activeId} 
          onSelect={setActiveId} 
        />
      </Card>

      <Card className={cn(
        "flex-[2] overflow-hidden flex flex-col relative",
        !activeId ? "hidden md:flex items-center justify-center text-gray-400" : "flex"
      )}>
        {activeId && activePartner ? (
          <>
            <div className="md:hidden absolute top-4 left-4 z-20">
               <Button variant="ghost" size="sm" onClick={() => setActiveId(null)} className="bg-white/50 backdrop-blur-sm rounded-full w-8 h-8 p-0">
                 <ArrowLeft className="w-5 h-5" />
               </Button>
            </div>
            <ChatWindow
              partner={activePartner}
              messages={messages[activeId] || []}
              onSendMessage={handleSendMessage}
              isTyping={isTyping[activeId] || false}
            />
          </>
        ) : (
          <div className="text-center">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </Card>
    </div>
  );
};
