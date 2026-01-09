import { User, Post, Notification, Conversation, Message } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { subMinutes, subHours, subDays } from 'date-fns';

// Helper to get random time
const now = new Date();

export const currentUser: User = {
  id: 'current-user',
  name: 'Alex Morgan',
  handle: '@alexmorgan',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  bio: 'Product Designer building digital experiences. Coffee enthusiast ☕️',
  location: 'San Francisco, CA',
  job: 'Senior Product Designer',
  website: 'alexmorgan.design',
  stats: {
    posts: 142,
    followers: 8432,
    following: 421
  },
  isOnline: true
};

export const users: User[] = [
  currentUser,
  {
    id: 'u1',
    name: 'Sarah Chen',
    handle: '@sarahchen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    cover: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bio: 'Photography & Travel. Capturing moments.',
    location: 'Tokyo, Japan',
    job: 'Photographer',
    stats: { posts: 890, followers: 12500, following: 320 },
    isOnline: true
  },
  {
    id: 'u2',
    name: 'Marcus Johnson',
    handle: '@marcusj',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bio: 'Tech enthusiast. Developer. Gamer.',
    location: 'London, UK',
    job: 'Software Engineer',
    stats: { posts: 45, followers: 1200, following: 800 },
    isOnline: false
  },
  {
    id: 'u3',
    name: 'Emma Wilson',
    handle: '@emmaw',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bio: 'Art director and UI lover.',
    location: 'New York, NY',
    job: 'Art Director',
    stats: { posts: 230, followers: 5600, following: 450 },
    isOnline: true
  },
  {
    id: 'u4',
    name: 'David Kim',
    handle: '@davidkim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bio: 'Building the future of web.',
    location: 'Seoul, Korea',
    job: 'Frontend Dev',
    stats: { posts: 112, followers: 3400, following: 200 },
    isOnline: false
  }
];

export const posts: Post[] = [
  {
    id: 'p1',
    authorId: 'u1',
    content: 'Just arrived in Kyoto! The colors of autumn here are absolutely breathtaking. Can\'t wait to explore the temples tomorrow. 🍁📸',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    likes: 1240,
    comments: [
      { id: 'c1', authorId: 'u3', content: 'This looks amazing! Have fun Sarah!', timestamp: subHours(now, 1).toISOString(), likes: 12 }
    ],
    shares: 45,
    timestamp: subHours(now, 2).toISOString(),
    likedByMe: true
  },
  {
    id: 'p2',
    authorId: 'u2',
    content: 'Working on a new React Native project. The performance improvements in the latest version are insane. Anyone else trying it out?',
    images: [],
    likes: 89,
    comments: [
      { id: 'c2', authorId: 'current-user', content: 'Yes! The new architecture is a game changer.', timestamp: subMinutes(now, 30).toISOString(), likes: 5 }
    ],
    shares: 12,
    timestamp: subHours(now, 5).toISOString(),
    likedByMe: false
  },
  {
    id: 'p3',
    authorId: 'u3',
    content: 'Sunday brunch vibes. 🥑☕️',
    images: [
      'https://images.unsplash.com/photo-1550950158-d0d960dff51b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    ],
    likes: 456,
    comments: [],
    shares: 8,
    timestamp: subDays(now, 1).toISOString(),
    likedByMe: false
  }
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    actorId: 'u1',
    targetId: 'p2',
    timestamp: subMinutes(now, 5).toISOString(),
    isRead: false
  },
  {
    id: 'n2',
    type: 'follow',
    actorId: 'u4',
    timestamp: subHours(now, 2).toISOString(),
    isRead: false
  },
  {
    id: 'n3',
    type: 'comment',
    actorId: 'u3',
    content: 'Love this shot! 🔥',
    targetId: 'p1',
    timestamp: subHours(now, 4).toISOString(),
    isRead: true
  }
];

export const initialConversations: Conversation[] = [
  {
    id: 'chat1',
    participants: ['current-user', 'u1'],
    lastMessage: {
      id: 'm1',
      senderId: 'u1',
      receiverId: 'current-user',
      content: 'Hey! Are we still on for lunch tomorrow?',
      timestamp: subMinutes(now, 15).toISOString(),
      type: 'text',
      status: 'delivered'
    },
    unreadCount: 1
  },
  {
    id: 'chat2',
    participants: ['current-user', 'u2'],
    lastMessage: {
      id: 'm2',
      senderId: 'current-user',
      receiverId: 'u2',
      content: 'Sent you the files.',
      timestamp: subDays(now, 1).toISOString(),
      type: 'text',
      status: 'read'
    },
    unreadCount: 0
  }
];

