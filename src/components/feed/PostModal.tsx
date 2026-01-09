import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { Post, users, currentUser } from '../../data/mockData';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { formatDistanceToNow } from 'date-fns';

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  const author = users.find(u => u.id === post.authorId);
  if (!author) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
        >
          <Button
            variant="ghost"
            className="absolute top-4 right-4 z-10 text-white bg-black/20 hover:bg-black/40 lg:text-gray-500 lg:bg-transparent lg:hover:bg-gray-100 dark:lg:text-gray-400 dark:lg:hover:bg-gray-800"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Image Section */}
          <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
             {post.images.length > 0 ? (
               <img 
                 src={post.images[0]} 
                 alt="Post content" 
                 className="w-full h-full object-contain"
               />
             ) : (
               <div className="p-8 text-center text-gray-400">
                 <p className="text-xl">{post.content}</p>
               </div>
             )}
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-[400px] flex flex-col bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <Avatar src={author.avatar} alt={author.name} size="md" />
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{author.name}</div>
                <div className="text-xs text-gray-500">{author.job}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
              {/* Post Caption */}
              <div className="flex gap-3">
                <Avatar src={author.avatar} alt={author.name} size="sm" />
                <div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl rounded-tl-none">
                     <span className="font-bold text-sm text-gray-900 dark:text-white mr-2">{author.name}</span>
                     <span className="text-sm text-gray-700 dark:text-gray-300">{post.content}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 ml-1">
                    {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </div>

              {/* Comments */}
              {post.comments.map(comment => {
                  const commentAuthor = users.find(u => u.id === comment.authorId);
                  if (!commentAuthor) return null;
                  return (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar src={commentAuthor.avatar} alt={commentAuthor.name} size="sm" />
                      <div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl rounded-tl-none">
                          <span className="font-bold text-sm text-gray-900 dark:text-white mr-2">{commentAuthor.name}</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 ml-1 flex gap-3">
                          <span>{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}</span>
                          <span className="font-medium cursor-pointer hover:text-gray-600">Reply</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <button className="group flex items-center gap-2">
                  <Heart className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors" />
                </button>
                <button className="group flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-gray-500 group-hover:text-orbit-500 transition-colors" />
                </button>
                <button className="group flex items-center gap-2 ml-auto">
                  <Share2 className="w-6 h-6 text-gray-500 group-hover:text-green-500 transition-colors" />
                </button>
              </div>
              <div className="font-bold text-sm text-gray-900 dark:text-white mb-2">
                {post.likes} likes
              </div>
              
              <div className="flex gap-2 items-center">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-orbit-500 font-medium text-sm disabled:opacity-50">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

