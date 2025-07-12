import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';
import { chatService } from './services/chatService';
import './App.css';

function App() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);

  // Initialize app with sample data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load chats
        const initialChats = await chatService.getChats();
        setChats(initialChats);
        
        // Load messages for each chat
        const messagesData = {};
        for (const chat of initialChats) {
          messagesData[chat.id] = await chatService.getMessages(chat.id);
        }
        setMessages(messagesData);
        
        // Set first chat as active
        if (initialChats.length > 0) {
          setActiveChat(initialChats[0].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Create new chat
  const createNewChat = async () => {
    try {
      const newChat = await chatService.createChat();
      setChats(prev => [newChat, ...prev]);
      setMessages(prev => ({ ...prev, [newChat.id]: [] }));
      setActiveChat(newChat.id);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  // Delete chat
  const deleteChat = async (chatId) => {
    try {
      await chatService.deleteChat(chatId);
      setChats(prev => prev.filter(chat => chat.id !== chatId));
      setMessages(prev => {
        const newMessages = { ...prev };
        delete newMessages[chatId];
        return newMessages;
      });
      
      // If deleted chat was active, switch to first available chat
      if (activeChat === chatId) {
        const remainingChats = chats.filter(chat => chat.id !== chatId);
        setActiveChat(remainingChats.length > 0 ? remainingChats[0].id : null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  // Send message
  const sendMessage = async (chatId, text) => {
    try {
      const newMessage = await chatService.sendMessage(chatId, text);
      
      // Update messages
      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), newMessage]
      }));
      
      // Update chat's last message and timestamp
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              lastMessage: text,
              lastMessageTime: newMessage.timestamp,
              updatedAt: new Date().toISOString()
            }
          : chat
      ));
      
      // Move chat to top of the list
      setChats(prev => {
        const chatIndex = prev.findIndex(chat => chat.id === chatId);
        if (chatIndex > 0) {
          const updatedChats = [...prev];
          const [movedChat] = updatedChats.splice(chatIndex, 1);
          updatedChats.unshift(movedChat);
          return updatedChats;
        }
        return prev;
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Get current chat
  const getCurrentChat = () => {
    return chats.find(chat => chat.id === activeChat);
  };

  // Get messages for active chat
  const getCurrentMessages = () => {
    return messages[activeChat] || [];
  };

  if (loading) {
    return (
      <div className="chat-app">
        <div className="loading">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        onCreateChat={createNewChat}
        onDeleteChat={deleteChat}
      />
      <MainChat
        chat={getCurrentChat()}
        messages={getCurrentMessages()}
        onSendMessage={sendMessage}
      />
    </div>
  );
}

export default App;
