import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onSelectChat, onNewChat, currentChatId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      //const response = await fetch('http://localhost:8080/user/fetchSessions', {
      const response = await fetch('https://hepngrwaqb.us-east-2.awsapprunner.com/user/fetchSessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }

      const data = await response.json();
      // Reverse the sessions array to show newest first
      setSessions([...data.data].reverse());
      console.log(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);

      try {
        // const response = await fetch('http://localhost:8080/upload', {
          const response = await fetch('https://hepngrwaqb.us-east-2.awsapprunner.com/upload', {
           
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('File upload failed');
        }

        const data = await response.json();
        console.log('Upload response:', data);

        if (data && data.session_id) {
          onSelectChat(data.session_id, file.name);
        }
        
        await fetchSessions();

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  
  return (
    <div className="w-1/4 bg-gray-800 p-4 shadow-lg border-r border-gray-700 h-screen flex flex-col">
      <div className="mb-4">
        <label className="block text-center bg-yellow-700 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg cursor-pointer">
          Upload New PDF
          <input type="file" accept="application/pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
      </div>

      <hr className="border-gray-600 mb-4" />

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            sessions.map((session) => (
              <li
                key={session.session_id}
                onClick={() => onSelectChat(session.session_id, session.fileName)}
                className={`p-2 rounded-lg cursor-pointer ${
                  session.session_id === currentChatId
                    ? 'bg-navy-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {session.fileName}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-4">
        <button 
          onClick={handleLogout} 
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg text-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;