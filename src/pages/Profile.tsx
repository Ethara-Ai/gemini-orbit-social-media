import React, { useState } from 'react';
import { MapPin, Link as LinkIcon, Calendar, Grid, Bookmark, Share2, Edit2, Check } from 'lucide-react';
import { currentUser, posts } from '../data/mockData';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 bg-gray-200 relative">
          <img 
            src={currentUser.cover} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 pb-6 relative">
          {/* Avatar & Actions */}
          <div className="flex justify-between items-end -mt-12 md:-mt-16 mb-6">
             <div className="relative">
               <Avatar 
                 src={currentUser.avatar} 
                 alt={currentUser.name} 
                 className="w-24 h-24 md:w-32 md:h-32 border-4 border-white dark:border-gray-900"
               />
             </div>
             <div className="flex gap-2 mb-2">
               <Button variant="outline" size="sm" onClick={handleShare}>
                 <Share2 className="w-4 h-4 mr-2" />
                 Share
               </Button>
               <Button size="sm">
                 <Edit2 className="w-4 h-4 mr-2" />
                 Edit Profile
               </Button>
             </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h1>
              <p className="text-gray-500">{currentUser.handle}</p>
            </div>

            <p className="text-gray-800 dark:text-gray-200 max-w-2xl">{currentUser.bio}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {currentUser.location}
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                <a href={`https://${currentUser.website}`} className="text-orbit-500 hover:underline">{currentUser.website}</a>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined March 2021
              </div>
            </div>

            <div className="flex gap-6 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="text-center sm:text-left">
                <span className="font-bold text-gray-900 dark:text-white block sm:inline mr-1">{currentUser.stats.posts}</span>
                <span className="text-gray-500">Posts</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-bold text-gray-900 dark:text-white block sm:inline mr-1">{currentUser.stats.followers}</span>
                <span className="text-gray-500">Followers</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-bold text-gray-900 dark:text-white block sm:inline mr-1">{currentUser.stats.following}</span>
                <span className="text-gray-500">Following</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={cn(
              "flex items-center gap-2 pb-4 border-b-2 transition-colors",
              activeTab === 'posts' 
                ? "border-orbit-500 text-orbit-500" 
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <Grid className="w-5 h-5" />
            <span className="font-medium">Posts</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={cn(
              "flex items-center gap-2 pb-4 border-b-2 transition-colors",
              activeTab === 'saved' 
                ? "border-orbit-500 text-orbit-500" 
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <Bookmark className="w-5 h-5" />
            <span className="font-medium">Saved</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <motion.div
            key={`${post.id}-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer group relative"
          >
            {post.images.length > 0 ? (
              <img
                src={post.images[0]}
                alt="Post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="p-4 h-full flex items-center justify-center text-center bg-gray-100 dark:bg-gray-800 text-gray-500">
                <p className="text-xs line-clamp-4">{post.content}</p>
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-4 font-bold">
               <span>{post.likes} ❤️</span>
               <span>{post.comments.length} 💬</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <Check className="w-4 h-4 text-green-400" />
            <span>Link copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

