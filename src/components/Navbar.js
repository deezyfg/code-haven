import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHome, faInfoCircle, faUsers, faSignOutAlt, faShare } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ roomId, username, onLeaveRoom, onCollaborate, onShare, isInRoom }) => {
  const handleCollaborate = () => {
    console.log('Collaborate button clicked');
    if (typeof onCollaborate === 'function') {
      onCollaborate();
    } else {
      console.error('onCollaborate is not a function');
    }
  };

  const handleShare = () => {
    console.log('Share button clicked');
    if (typeof onShare === 'function') {
      onShare();
    } else {
      console.error('onShare is not a function');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <FontAwesomeIcon icon={faCode} />
          <span className="ml-2">Code Haven</span>
        </Link>
      </div>

      <div className="navbar-menu">
        {!isInRoom && (
          <div className="navbar-start">
            <Link to="/" className="navbar-item home-btn">
              <FontAwesomeIcon icon={faHome} className="icon" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="navbar-item about-btn">
              <FontAwesomeIcon icon={faInfoCircle} className="icon" />
              <span>About</span>
            </Link>
          </div>
        )}
        {isInRoom && (
          <div className="navbar-end">
            <button className="button collaborate" onClick={handleCollaborate}>
              <FontAwesomeIcon icon={faUsers} />
              <span className="ml-2">Collaborate</span>
            </button>
            <button className="button share" onClick={handleShare}>
              <FontAwesomeIcon icon={faShare} />
              <span className="ml-2">Share</span>
            </button>
            <button className="button leave" onClick={onLeaveRoom}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="ml-2">Leave Room</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
