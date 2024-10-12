import React from 'react';
import { toast } from 'react-hot-toast';
import { FaCopy, FaEnvelope, FaTimes } from 'react-icons/fa';
import './ShareMenu.css';

const ShareMenu = ({ roomId, onClose }) => {
  const inviteLink = `${window.location.origin}/room/${roomId}`;

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink).then(
      () => toast.success('Invite link copied to clipboard'),
      () => toast.error('Failed to copy invite link')
    );
  };
  
  const handleShareViaEmail = () => {
    const subject = 'Join my coding session on CodeHaven';
    const body = `Join my coding session on CodeHaven using this link: ${inviteLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="share-menu-overlay">
      <div className="share-menu">
        <button onClick={onClose} className="close-btn" aria-label="Close">
          <FaTimes />
        </button>
        <h2>Share Room</h2>
        
        <div className="invite-link">
          <input type="text" value={inviteLink} readOnly />
          <button onClick={handleCopyInviteLink} aria-label="Copy invite link">
            <FaCopy />
          </button>
        </div>

        <div className="share-options">
          <button onClick={handleShareViaEmail} className="share-btn">
            <FaEnvelope /> Share via Email
          </button>
        </div>

        <div className="room-info">
          <h3>Room Information</h3>
          <p>Room ID: <strong>{roomId}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;
