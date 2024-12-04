import React, { useEffect, useRef } from 'react';

const ChatBox = ({ messages }) => {
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever the messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatBoxRef}
      className="flex-1 overflow-y-auto p-4 bg-gray-800"
      style={{ maxHeight: 'calc(100vh - 160px)' }} // Adjust the height to fit the screen and prevent overflow
    >
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
};

export default ChatBox;