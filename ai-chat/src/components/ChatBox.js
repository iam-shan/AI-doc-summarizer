import React, { useEffect, useRef } from 'react';

const Throbber = () => (
  <div className="flex space-x-2 p-4 text-white">
    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const ChatBox = ({ messages, isLoading }) => {
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={chatBoxRef}
      className="flex-1 overflow-y-auto p-4 bg-gray-800"
      style={{ maxHeight: 'calc(100vh - 160px)' }}
    >
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
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
        {isLoading && <Throbber />}
      </div>
    </div>
  );
};

export default ChatBox;