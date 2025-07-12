import React from 'react';
import { chatService } from '../services/chatService';

const Message = ({ message, isOwn, showAvatar }) => {
  const getAvatarColor = (senderId) => {
    // Generate consistent color based on user ID
    const colors = ['#6264a7', '#0078d4', '#107c10', '#d83b01', '#5c2d91', '#e81123'];
    const index = senderId.charCodeAt(senderId.length - 1) % colors.length;
    return colors[index];
  };

  const formatTimestamp = (timestamp) => {
    return chatService.formatMessageTime(timestamp);
  };

  return (
    <div className={`message ${isOwn ? 'own' : ''}`}>
      {showAvatar && (
        <div 
          className="message-avatar"
          style={{ 
            backgroundColor: isOwn ? '#0078d4' : getAvatarColor(message.senderId)
          }}
        >
          {chatService.getUserInitials(message.senderName)}
        </div>
      )}
      
      <div className="message-content">
        {showAvatar && (
          <div className="message-header">
            <div className="message-sender">
              {message.senderName}
            </div>
            <div className="message-time">
              {formatTimestamp(message.timestamp)}
            </div>
          </div>
        )}
        
        <div className="message-text">
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default Message;
