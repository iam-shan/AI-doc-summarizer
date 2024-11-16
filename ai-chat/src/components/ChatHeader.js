import React from 'react';
import { FiDownload } from 'react-icons/fi'; // Download icon
import { AiOutlineClose } from 'react-icons/ai'; // Clear chat icon
import '../css/ChatHeader.css';

const ChatHeader = ({ title, onSummarize, onDownload, onClearChat }) => {
  return (
    <div className="chat-header">
      <h2>Chat with {title}</h2>
        <div className="chat-header-actions">
            <button className="summarize-btn" onClick={onSummarize} title="Summarize Chat">
                Summarize
            </button>
            <button className="icon-button" onClick={onDownload} title="Download Chat">
                <FiDownload size={20}/>
            </button>
            <button className="icon-button" onClick={onClearChat} title="Clear Chat">
                <AiOutlineClose size={20}/>
            </button>
        </div>
    </div>
  );
};

export default ChatHeader;
