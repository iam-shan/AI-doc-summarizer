import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import ChatBox from '../components/ChatBox';
import UserInput from '../components/UserInput';
import '../css/ChatApp.css';

const ChatApp = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentFileName, setCurrentFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchChats = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      //const response = await fetch('http://localhost:8080/user/getChats', {
        const response = await fetch('https://hepngrwaqb.us-east-2.awsapprunner.com/user/getChats', {
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
      const formattedMessages = data.data.flatMap((chat) => [
        { sender: 'user', text: chat.userMessage },
        { sender: 'bot', text: chat.aiResponse }
      ]);
      setChats(formattedMessages);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSummarize = async () => {
    if (!currentChatId) {
      alert('Please select a document first');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      // const response = await fetch('http://localhost:8080/chat', {
        const response = await fetch('https://hepngrwaqb.us-east-2.awsapprunner.com/chat', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: currentChatId,
          userMessage: "Summarize this PDF document."
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      setChats(prevChats => [
        ...prevChats,
        { sender: 'user', text: "Summarize this PDF document." },
        { sender: 'bot', text: data.aiResponse }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error getting summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (chats.length === 0) {
      alert('No chat messages to download');
      return;
    }

    const chatContent = chats.map(msg => {
      const sender = msg.sender === 'user' ? 'You' : 'AI';
      return `${sender}: ${msg.text}\n`;
    }).join('\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${currentFileName || 'session'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <Sidebar
        currentChatId={currentChatId}
        onSelectChat={(sessionId, fileName) => {
          setCurrentChatId(sessionId);
          setCurrentFileName(fileName);
          fetchChats(sessionId);
        }}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader
          title={currentFileName || 'No Chat Selected'}
          onSummarize={handleSummarize}
          onDownload={handleDownload}
        />
        <ChatBox messages={chats} isLoading={isLoading} />
        <UserInput
          sessionId={currentChatId}
          setIsLoading={setIsLoading} // Pass setIsLoading to UserInput
          onSend={async (userMessage, aiResponse) => {
            setChats((prevChats) => [
              ...prevChats,
              { sender: 'user', text: userMessage },
              { sender: 'bot', text: aiResponse }
            ]);
          }}
        />
      </div>
    </div>
  );
};

export default ChatApp;