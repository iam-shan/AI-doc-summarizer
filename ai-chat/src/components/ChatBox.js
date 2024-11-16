import React from 'react';
import '../css/ChatBox.css';

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className="chat-message">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
