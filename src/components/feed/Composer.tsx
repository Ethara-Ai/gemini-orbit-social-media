import React, { useState } from 'react';
import { Image as ImageIcon, Send, Smile } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { currentUser } from '../../data/mockData';

export const Composer: React.FC = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Card className="p-4 sm:p-6 mb-6">
      <div className="flex gap-4">
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What's happening?"
            className="w-full bg-transparent border-none resize-none focus:ring-0 text-lg placeholder-gray-400 min-h-[100px]"
          />
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-orbit-500 hover:bg-orbit-50 dark:hover:bg-orbit-900/20">
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-orbit-500 hover:bg-orbit-50 dark:hover:bg-orbit-900/20">
                <Smile className="w-5 h-5" />
              </Button>
            </div>
            <Button 
              disabled={!text.trim()} 
              className="px-6 rounded-full"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

