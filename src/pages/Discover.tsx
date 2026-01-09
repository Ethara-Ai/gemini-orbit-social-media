import React, { useState } from 'react';
import { posts } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { PostModal } from '../components/feed/PostModal';
import { Post } from '../data/mockData';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const CATEGORIES = [
  'For You', 'Design', 'Technology', 'Photography', 'Travel', 'Art', 'Food', 'Fashion', 'Music'
];

export const Discover: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('For You');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Duplicate posts to fill grid
  const displayPosts = [...posts, ...posts, ...posts];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discover</h1>
        <p className="text-gray-500">Explore the latest trends and inspiration.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200",
              activeCategory === category
                ? "bg-orbit-500 text-white shadow-lg shadow-orbit-500/25"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayPosts.map((post, index) => {
          const isFeatured = index === 0 || index === 3;
          return (
            <motion.div
              key={`${post.id}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPost(post)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800",
                isFeatured ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              )}
            >
              {post.images.length > 0 ? (
                <img
                  src={post.images[0]}
                  alt="Post"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="p-6 h-full flex items-center justify-center text-center bg-gradient-to-br from-orbit-400 to-orbit-600 text-white">
                  <p className="font-medium text-lg line-clamp-4">{post.content}</p>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span>{post.likes} ❤️</span>
                  <span>{post.comments.length} 💬</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

