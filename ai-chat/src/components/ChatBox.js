import React from 'react';

const ChatBox = ({ messages }) => (
  <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`mb-2 p-2 rounded ${
          msg.sender === 'user' ? 'bg-blue-700 text-white ml-auto' : 'bg-gray-600 text-gray-200'
        }`}
        style={{
          maxWidth: '60%',
          alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
        }}
      >
        {msg.text}
      </div>
    ))}
  </div>
);

export default ChatBox;