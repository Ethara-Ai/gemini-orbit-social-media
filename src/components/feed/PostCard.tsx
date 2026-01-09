import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { Post } from '../../types';
import { users } from '../../data/mockData';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const author = users.find(u => u.id === post.authorId);

  if (!author) return null;

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-0 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar src={author.avatar} alt={author.name} size="md" />
              <div>
                <div className="font-bold text-gray-900 dark:text-white hover:underline cursor-pointer">
                  {author.name}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-gray-800 dark:text-gray-200 text-base mb-4 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>

          {post.images.length > 0 && (
            <div className={cn(
              "grid gap-2 rounded-xl overflow-hidden mb-4",
              post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
            )}>
              {post.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Post content"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                  style={{ maxHeight: '400px' }}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 pt-2">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-red-500 group",
                isLiked ? "text-red-500" : "text-gray-500"
              )}
            >
              <Heart className={cn(
                "w-5 h-5 transition-transform group-active:scale-125",
                isLiked && "fill-current"
              )} />
              <span>{likeCount}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orbit-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>

            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-500 transition-colors ml-auto">
              <Share2 className="w-5 h-5" />
              <span>{post.shares}</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800"
            >
              <div className="p-4 sm:p-6 space-y-4">
                {post.comments.map(comment => {
                  const commentAuthor = users.find(u => u.id === comment.authorId);
                  if (!commentAuthor) return null;
                  return (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar src={commentAuthor.avatar} alt={commentAuthor.name} size="sm" />
                      <div className="flex-1 bg-white dark:bg-gray-900 p-3 rounded-2xl rounded-tl-none shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-gray-900 dark:text-white">{commentAuthor.name}</span>
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  );
                })}
                
                <div className="flex gap-3 items-center mt-4">
                  <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-orbit-500 dark:focus:border-orbit-500 transition-colors"
                    />
                    <button 
                      disabled={!commentText.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-orbit-500 hover:bg-orbit-50 rounded-full disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

