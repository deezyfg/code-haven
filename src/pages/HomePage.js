import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faUsers, faLightbulb, faRocket } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success('Created a new room');
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      toast.error('ROOM ID & Username are required');
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };

  return (
    <div className="homePageWrapper">
      <Navbar 
        roomId={null}
        username={null}
        onLeaveRoom={() => {}}
        onCollaborate={() => {}}
        onShare={() => {}}
        isInRoom={false}
      />
      <div className="homePageContent">
        <div className="hero-section">
          <h1 className="title">Welcome to Code Haven</h1>
          <p className="subtitle">Collaborate on code in real-time with developers around the world</p>
        </div>
        <div className="features">
          <div className="feature">
            <FontAwesomeIcon icon={faCode} size="3x" />
            <h2>Real-time Editing</h2>
            <p>Edit code simultaneously with your team members</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faUsers} size="3x" />
            <h2>Multiple Languages</h2>
            <p>Support for various programming languages</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faLightbulb} size="3x" />
            <h2>Instant Collaboration</h2>
            <p>Share ideas and solve problems together</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faRocket} size="3x" />
            <h2>Boost Productivity</h2>
            <p>Streamline your coding workflow</p>
          </div>
        </div>
        <div className="form-container">
          <img
            className="form-logo"
            src="/code-haven.png"
            alt="code-haven-logo"
          />
          <h3 className="form-title">Access Your Collaborative Space</h3>
          <form className="join-form" onSubmit={joinRoom}>
            <input
              type="text"
              placeholder="ROOM ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              aria-label="Room ID"
            />
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
            />
            <button type="submit" className="button is-primary">
              Join Room
            </button>
            <p className="form-footer">
              Don't have a room? <button onClick={createNewRoom} className="link-button">Create a new room</button>
            </p>
          </form>
        </div>
      </div>
      <footer className="page-footer">
        <p>Built with ❤️ by Peter Opoku-Mensah 🚀</p>
      </footer>
    </div>
  );
};

export default HomePage;
