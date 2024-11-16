import React, { useState } from 'react';
import '../css/UserInput.css';

const UserInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="user-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask any question..."
        onKeyPress={handleKeyPress} // Listen for Enter key press
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default UserInput;
