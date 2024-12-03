import React, { useState } from 'react';

const UserInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
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