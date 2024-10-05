import React from 'react';
import { toast } from 'react-hot-toast';
import './ShareMenu.css';

const ShareMenu = ({ roomId, onClose }) => {
  console.log('ShareMenu rendered', { roomId });

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText("Let's collaborate on CodeHaven.\nJoin my coding session using this link: " + inviteLink + 
      `\nOr use this Room Id: ${roomId} on CodeHaven: ${window.location.origin}` ).then(
      () => toast.success('Invite link copied to clipboard'),
      () => toast.error('Failed to copy invite link')
    );
  };
  
  const handleShareViaEmail = () => {
    const subject = 'Join my coding session';
    const body = `Join my coding session on CodeHaven using this link: ${window.location.origin}/room/${roomId}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="share-menu-overlay">
      <div className="share-menu">
        <button onClick={onClose} className="close-btn">X</button>
        <h3>Share Room</h3>
        
        <div className="share-options">
          <button onClick={handleCopyInviteLink} className="share-btn">
            Copy Invite Link
          </button>
          <button onClick={handleShareViaEmail} className="share-btn">
            Share via Email
          </button>
        </div>

        <div className="room-info">
          <h4>Room Information</h4>
          <p>Room ID: {roomId}</p>
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;
