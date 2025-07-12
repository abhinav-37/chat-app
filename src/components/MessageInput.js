import React, { useState, useRef, useEffect } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-wrapper">
        <textarea
          ref={textareaRef}
          className="message-input"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!message.trim()}
          title="Send message (Enter)"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
