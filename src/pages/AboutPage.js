import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faCode, faComments, faLock, faRocket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="aboutPageWrapper">
      <Navbar 
        roomId={null}
        username={null}
        onLeaveRoom={() => {}}
        onCollaborate={() => {}}
        onShare={() => {}}
        isInRoom={false}
      />
      <div className="aboutPageContent">
        <h1 className="title">About Code Haven</h1>
        <p className="description">
          <span className="animated-text">Code Haven</span> is a cutting-edge collaborative coding platform that empowers developers to work together in real-time.
          Our mission is to revolutionize remote pair programming and code reviews, making them more efficient and enjoyable.
        </p>
        
        <h2 className="subtitle">Key Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <FontAwesomeIcon icon={faSync} size="2x" />
            <h3>Real-time Synchronization</h3>
            <p>Code updates instantly across all connected devices</p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faCode} size="2x" />
            <h3>Multi-language Support</h3>
            <p>Write code in a wide range of programming languages</p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faComments} size="2x" />
            <h3>Integrated Chat</h3>
            <p>Communicate with your team without leaving the platform</p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faLock} size="2x" />
            <h3>Secure Rooms</h3>
            <p>Collaborate in private, secure coding environments</p>
          </div>
        </div>
        
        <div className="tech-stack">
          <h2 className="subtitle">Our Technology Stack</h2>
          <p>
            Built with modern web technologies including 
            <span className="tech-item">React</span>, 
            <span className="tech-item">Monaco Editor</span>, 
            <span className="tech-item">Node.js</span>, 
            <span className="tech-item">Express</span>, and 
            <span className="tech-item">Socket.IO</span>,
            Code Haven delivers a seamless, responsive experience for developers collaborating
            on projects from anywhere in the world.
          </p>
        </div>
        
        <div className="cta-section">
          <h2 className="subtitle">Ready to elevate your collaborative coding?</h2>
          <Link to="/" className="cta-button">
            <FontAwesomeIcon icon={faRocket} /> Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
