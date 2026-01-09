import React from 'react';
import { Composer } from '../components/feed/Composer';
import { PostCard } from '../components/feed/PostCard';
import { posts } from '../data/mockData';

export const Home: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Composer />
      <div className="flex flex-col gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

