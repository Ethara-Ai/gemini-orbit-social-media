export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  cover: string;
  bio: string;
  location: string;
  job: string;
  website?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  isOnline?: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  images: string[];
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
  likedByMe: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image';
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share';
  actorId: string;
  content?: string;
  targetId?: string; // ID of post or comment
  timestamp: string;
  isRead: boolean;
}

