import { v4 as uuidv4 } from 'uuid';

// Mock data for demonstration
const mockChats = [
  {
    id: 'chat-1',
    name: 'General',
    type: 'channel',
    lastMessage: 'Hey everyone! How are you doing today?',
    lastMessageTime: new Date('2025-01-12T16:45:00').toISOString(),
    createdAt: new Date('2025-01-10T09:00:00').toISOString(),
    updatedAt: new Date('2025-01-12T16:45:00').toISOString(),
    participants: ['user-1', 'user-2', 'user-3']
  },
  {
    id: 'chat-2',
    name: 'Project Team',
    type: 'channel',
    lastMessage: 'The new feature is ready for testing',
    lastMessageTime: new Date('2025-01-12T15:30:00').toISOString(),
    createdAt: new Date('2025-01-09T14:00:00').toISOString(),
    updatedAt: new Date('2025-01-12T15:30:00').toISOString(),
    participants: ['user-1', 'user-2', 'user-4']
  },
  {
    id: 'chat-3',
    name: 'Random',
    type: 'channel',
    lastMessage: 'Anyone up for coffee?',
    lastMessageTime: new Date('2025-01-12T14:15:00').toISOString(),
    createdAt: new Date('2025-01-08T11:00:00').toISOString(),
    updatedAt: new Date('2025-01-12T14:15:00').toISOString(),
    participants: ['user-1', 'user-3', 'user-5']
  }
];

const mockMessages = {
  'chat-1': [
    {
      id: 'msg-1',
      chatId: 'chat-1',
      senderId: 'user-2',
      senderName: 'John Doe',
      text: 'Good morning everyone!',
      timestamp: new Date('2025-01-12T09:00:00').toISOString(),
      type: 'text'
    },
    {
      id: 'msg-2',
      chatId: 'chat-1',
      senderId: 'user-1',
      senderName: 'You',
      text: 'Morning John! How was your weekend?',
      timestamp: new Date('2025-01-12T09:05:00').toISOString(),
      type: 'text'
    },
    {
      id: 'msg-3',
      chatId: 'chat-1',
      senderId: 'user-3',
      senderName: 'Jane Smith',
      text: 'It was great! Went hiking with family. How about you?',
      timestamp: new Date('2025-01-12T09:10:00').toISOString(),
      type: 'text'
    },
    {
      id: 'msg-4',
      chatId: 'chat-1',
      senderId: 'user-1',
      senderName: 'You',
      text: 'That sounds amazing! I spent time working on a side project.',
      timestamp: new Date('2025-01-12T09:15:00').toISOString(),
      type: 'text'
    },
    {
      id: 'msg-5',
      chatId: 'chat-1',
      senderId: 'user-2',
      senderName: 'John Doe',
      text: 'Hey everyone! How are you doing today?',
      timestamp: new Date('2025-01-12T16:45:00').toISOString(),
      type: 'text'
    }
  ],
  'chat-2': [
    {
      id: 'msg-6',
      chatId: 'chat-2',
      senderId: 'user-4',
      senderName: 'Mike Johnson',
      text: 'The API integration is complete',
      timestamp: new Date('2025-01-12T14:00:00').toISOString(),
      type: 'text'
    },
    {
      id: 'msg-7',
      chatId: 'chat-2',
      senderId: 'user-1',
      senderName: 'You',
      text: 'Excellent work! What about the frontend components?',
      timestamp: new Date('2025-01-12T14:30:00').toISOString(),
      type: 'text'
    },
    {
      id: 'msg-8',
      chatId: 'chat-2',
      senderId: 'user-2',
      senderName: 'John Doe',
      text: 'The new feature is ready for testing',
      timestamp: new Date('2025-01-12T15:30:00').toISOString(),
      type: 'text'
    }
  ],
  'chat-3': [
    {
      id: 'msg-9',
      chatId: 'chat-3',
      senderId: 'user-3',
      senderName: 'Jane Smith',
      text: 'Anyone up for coffee?',
      timestamp: new Date('2025-01-12T14:15:00').toISOString(),
      type: 'text'
    }
  ]
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate user initials for avatar
const getUserInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase();
};

// Get relative time string
const getRelativeTime = (timestamp) => {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInMs = now - messageTime;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;
  
  return messageTime.toLocaleDateString();
};

export const chatService = {
  // Get all chats
  async getChats() {
    await delay(500); // Simulate API call
    return mockChats.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  // Get messages for a specific chat
  async getMessages(chatId) {
    await delay(300); // Simulate API call
    return mockMessages[chatId] || [];
  },

  // Create a new chat
  async createChat(name = null) {
    await delay(200); // Simulate API call
    
    const chatCount = mockChats.length + 1;
    const newChat = {
      id: uuidv4(),
      name: name || `New Chat ${chatCount}`,
      type: 'channel',
      lastMessage: null,
      lastMessageTime: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      participants: ['user-1'] // Current user
    };

    mockChats.unshift(newChat);
    mockMessages[newChat.id] = [];
    
    return newChat;
  },

  // Delete a chat
  async deleteChat(chatId) {
    await delay(200); // Simulate API call
    
    const chatIndex = mockChats.findIndex(chat => chat.id === chatId);
    if (chatIndex > -1) {
      mockChats.splice(chatIndex, 1);
      delete mockMessages[chatId];
    }
    
    return true;
  },

  // Send a message
  async sendMessage(chatId, text) {
    await delay(100); // Simulate API call
    
    const newMessage = {
      id: uuidv4(),
      chatId,
      senderId: 'user-1',
      senderName: 'You',
      text: text.trim(),
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    if (!mockMessages[chatId]) {
      mockMessages[chatId] = [];
    }
    
    mockMessages[chatId].push(newMessage);
    
    // Update chat's last message info
    const chat = mockChats.find(c => c.id === chatId);
    if (chat) {
      chat.lastMessage = text.trim();
      chat.lastMessageTime = newMessage.timestamp;
      chat.updatedAt = new Date().toISOString();
    }
    
    return newMessage;
  },

  // Utility functions
  getUserInitials,
  getRelativeTime,

  // Format message timestamp
  formatMessageTime(timestamp) {
    const messageTime = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(messageTime.getFullYear(), messageTime.getMonth(), messageTime.getDate());
    
    const timeString = messageTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    if (messageDate.getTime() === today.getTime()) {
      return timeString;
    } else if (messageDate.getTime() === today.getTime() - 86400000) {
      return `Yesterday ${timeString}`;
    } else {
      return messageTime.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  }
};
