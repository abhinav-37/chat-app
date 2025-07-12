import React from 'react';
import { chatService } from '../services/chatService';

const Sidebar = ({ chats, activeChat, onChatSelect, onCreateChat, onDeleteChat }) => {
  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      onDeleteChat(chatId);
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Chat App</h1>
        <button className="new-chat-btn" onClick={onCreateChat}>
          + New Chat
        </button>
      </div>
      
      <div className="chat-list">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="chat-item-content">
              <div className="chat-item-name">
                # {chat.name}
              </div>
              <div className="chat-item-preview">
                {chat.lastMessage ? truncateText(chat.lastMessage) : 'No messages yet'}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {chat.lastMessageTime && (
                <div className="chat-item-time">
                  {chatService.getRelativeTime(chat.lastMessageTime)}
                </div>
              )}
              <button
                className="delete-chat-btn"
                onClick={(e) => handleDeleteChat(e, chat.id)}
                title="Delete chat"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        
        {chats.length === 0 && (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px'
          }}>
            No chats yet. Create your first chat!
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
