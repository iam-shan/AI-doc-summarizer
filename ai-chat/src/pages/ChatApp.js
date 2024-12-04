import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import ChatBox from '../components/ChatBox';
import UserInput from '../components/UserInput';
import '../css/ChatApp.css';

const ChatApp = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(1);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={(chatId) => setCurrentChatId(chatId)}
        onNewChat={(file) =>
          setChats([...chats, { id: chats.length + 1, title: file.name, messages: [] }])
        }
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader
          title={currentChat?.title || 'Chat Application'}
          onSummarize={() => {}}
          onDownload={() => {}}
          onClearChat={() => {}}
        />
        <ChatBox messages={currentChat ? currentChat.messages : []} />
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