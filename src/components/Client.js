import React from 'react';
import Avatar from './Avatar';
import './Client.css';

const Client = ({ username, active, color }) => {
  return (
    <div className={`client ${active ? 'active' : ''}`}>
      <Avatar name={username} backgroundColor={color} />
      <span className="userName">{username}</span>
      {active && <span className="activeIndicator"></span>}
    </div>
  );
};

export default Client;
