import React from 'react';
import { FiDownload } from 'react-icons/fi';  // Keep only the download icon

const ChatHeader = ({ title, onSummarize, onDownload }) => (
  <div className="bg-gray-900 p-4 flex justify-between items-center">
    <h2 className="text-lg font-bold text-white">
      {title}
    </h2>
    <div className="space-x-2">
      <button
        onClick={onSummarize}
        className="bg-yellow-700 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg cursor-pointer"
      >
        Summarize
      </button>
      <button
        onClick={onDownload}
        className="text-warm-white hover:text-warm-white p-2 rounded-lg cursor-pointer"
      >
        <FiDownload size={20} />
      </button>
    </div>
  </div>
);

export default ChatHeader;