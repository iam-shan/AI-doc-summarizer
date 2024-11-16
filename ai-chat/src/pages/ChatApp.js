import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import ChatBox from '../components/ChatBox';
import UserInput from '../components/UserInput';
import '../css/ChatApp.css';

const ChatApp = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: 'constitution.pdf',
      messages: ['Welcome to the helpful PDF file on the Constitution of the United States!'],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const handleSummarize = async () => {
    try {
      // Prepare the chat data to be sent for summarization
      const chatMessages = currentChat?.messages || [];
      const requestData = {
        messages: chatMessages,
      };

      // Make a call to the backend (using fetch or axios)
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to summarize the chat');
      }

      const data = await response.json();
      const summary = data.summary;

      // Add the summary to the chat messages
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, `Summary: ${summary}`] }
            : chat
        )
      );
    } catch (error) {
      console.error('Error summarizing the chat:', error);
      // You could handle the error more gracefully, perhaps show a message to the user
    }
  };

  const handleDownloadChat = () => {
    const chatData = currentChat?.messages.join('\n') || '';
    const blob = new Blob([chatData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${currentChat?.title || 'chat'}.txt`;
    link.click();
  };

  const handleClearChat = () => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId ? { ...chat, messages: [] } : chat
      )
    );
  };

  const handleNewChat = (file) => {
    const newChatId = chats.length ? chats[chats.length - 1].id + 1 : 1;
    const newChat = {
      id: newChatId,
      title: file.name, // Use the uploaded file's name as the chat title
      messages: [`Welcome! You've uploaded "${file.name}".`],
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChatId);
  };

  return (
    <div className="chat-app">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={(chatId) => setCurrentChatId(chatId)}
        onNewChat={handleNewChat}
      />
      <div className="chat-container">
        <ChatHeader
          title={currentChat?.title || 'No Chat Selected'}
          onSummarize={handleSummarize}
          onDownload={handleDownloadChat}
          onClearChat={handleClearChat}
        />
        <ChatBox messages={currentChat ? currentChat.messages : []} />
        <UserInput onSend={(message) =>
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === currentChatId
                ? { ...chat, messages: [...chat.messages, message] }
                : chat
            )
          )
        } />
      </div>
    </div>
  );
};

export default ChatApp;
