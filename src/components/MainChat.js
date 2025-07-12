import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

const MainChat = ({ chat, messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  // Scroll to bottom when switching chats
  useEffect(() => {
    scrollToBottom();
    setIsAtBottom(true);
  }, [chat?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const atBottom = scrollHeight - scrollTop === clientHeight;
    setIsAtBottom(atBottom);
  };

  const handleSendMessage = (text) => {
    if (chat && text.trim()) {
      onSendMessage(chat.id, text);
      setIsAtBottom(true);
    }
  };

  if (!chat) {
    return (
      <div className="main-chat">
        <div className="empty-state">
          <h3>Welcome to Chat App</h3>
          <p>Select a chat from the sidebar to start messaging, or create a new chat to get started.</p>
        </div>
      </div>
    );
  }

  console.log("messages:::", messages);

  return (
    <div className="main-chat">
      <div className="chat-header">
        <div>
          <h2># {chat.name}</h2>
          <div className="chat-header-info">
            {chat.participants?.length > 0 && (
              <span>{chat.participants.length} participant{chat.participants.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </div>

      <div 
        className="messages-container"
        onScroll={handleScroll}
      >
        {messages.length === 0 ? (
          <div className="empty-state">
            <h3>No messages yet</h3>
            <p>Start the conversation by sending a message below.</p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                isOwn={message.senderId === 'user-1'}
                showAvatar={
                  index === 0 || 
                  messages[index - 1].senderId !== message.senderId ||
                  (new Date(message.timestamp) - new Date(messages[index - 1].timestamp)) > 300000 // 5 minutes
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default MainChat;
