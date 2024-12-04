import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ chats, currentChatId, onSelectChat, onNewChat }) => {
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      onNewChat(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="w-1/4 bg-gray-800 p-4 shadow-lg border-r border-gray-700 h-screen flex flex-col justify-between">
      <div>
        <label className="block text-center bg-yellow-700 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg cursor-pointer mb-4">
          Upload New PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>

        <hr className="border-gray-600 my-4" />

        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-2 rounded-lg cursor-pointer ${
                chat.id === currentChatId
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;