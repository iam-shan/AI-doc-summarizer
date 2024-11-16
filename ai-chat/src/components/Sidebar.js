import React from 'react';
import '../css/Sidebar.css';

const Sidebar = ({ chats, currentChatId, onSelectChat, onNewChat }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      console.log("Uploaded file:", file.name); // Debugging
      onNewChat(file);  // Call the function passed as a prop
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="sidebar">
      {/* Styled label to work as a button */}
      <label className="upload-btn">
        Upload New PDF
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          style={{ display: 'none' }} // Hide the file input
        />
      </label>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            style={{
              fontWeight: chat.id === currentChatId ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
