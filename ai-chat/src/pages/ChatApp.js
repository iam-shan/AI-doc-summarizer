import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import ChatBox from '../components/ChatBox';
import UserInput from '../components/UserInput';
import '../css/ChatApp.css';

const ChatApp = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Fetch chats based on the selected session
  const fetchChats = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/user/getChats', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chats');
      }

      const data = await response.json();
      // Transform the chat data into paired messages (user-bot)
      const formattedMessages = data.data.flatMap((chat) => [
        { sender: 'user', text: chat.userMessage },
        { sender: 'bot', text: chat.aiResponse }
      ]);
      setChats(formattedMessages);
      console.log(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <Sidebar
        currentChatId={currentChatId}
        onSelectChat={(sessionId) => {
          setCurrentChatId(sessionId); // Update currentChatId when a session is selected
          fetchChats(sessionId); // Fetch chats for the selected session
        }}
        onNewChat={(newChat) => {
          const newChatEntry = { id: newChat.fileId, title: newChat.title, messages: [] };
          setChats((prevChats) => [...prevChats, newChatEntry]);
          setCurrentChatId(newChat.fileId);
        }}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader
          title={currentChatId ? `Session: ${currentChatId}` : 'Chat Application'}
          onSummarize={() => {}}
          onDownload={() => {}}
          onClearChat={() => {}}
        />
        <ChatBox messages={chats} />
        <UserInput
          onSend={(message) =>
            setChats((prevChats) =>
              prevChats.map((chat) =>
                chat.id === currentChatId
                  ? { ...chat, messages: [...chat.messages, message] }
                  : chat
              )
            )
          }
        />
      </div>
    </div>
  );
};

export default ChatApp;