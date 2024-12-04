import React, { useState } from 'react';

const UserInput = ({ onSend, sessionId }) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/chat', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionId,
            userMessage: userMessage,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch AI response');
        }

        const data = await response.json();
        const aiResponse = data.aiResponse;

        onSend(userMessage, aiResponse);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      // Reset the input field
      setInput('');
    }
  };

  return (
    <div className="p-4 bg-gray-900 flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask any question..."
        className="flex-1 p-2 rounded-l bg-gray-700 text-white"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-r"
      >
        Send
      </button>
    </div>
  );
};

export default UserInput;