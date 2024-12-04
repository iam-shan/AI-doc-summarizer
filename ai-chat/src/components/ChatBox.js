import React from 'react';

const ChatBox = ({ messages }) => (
  <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
    {messages.map((msg, index) => (
      <div key={index} className="mb-2 bg-blue-700 p-2 rounded">
        {msg}
      </div>
    ))}
  </div>
);

export default ChatBox;