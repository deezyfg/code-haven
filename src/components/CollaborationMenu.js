import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import FileUploader from './FileUploader';
import Whiteboard from './Whiteboard';
import VotingSystem from './VotingSystem';
import GroupChat from './GroupChat';
import Avatar from './Avatar';
import './CollaborationMenu.css';

const CollaborationMenu = ({ roomId, socket, onClose, clients }) => {
  const [isReady, setIsReady] = useState(false);
  const [inviteOption, setInviteOption] = useState(null);
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteMessage, setInviteMessage] = useState('Welcome to our collaboration room!');
  const [showChat, setShowChat] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleReady = () => {
    setIsReady(true);
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(inviteLink).then(
      () => toast.success('Invite link copied to clipboard'),
      () => toast.error('Failed to copy invite link')
    );
  };

  const handleShareLink = (platform) => {
    const inviteLink = `${window.location.origin}/room/${roomId}`;
    let shareUrl = '';

    switch (platform) {
      case 'email':
        shareUrl = `mailto:?subject=Join our collaboration&body=${encodeURIComponent(inviteMessage + '\n\n' + inviteLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(inviteMessage + ' ' + inviteLink)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage + ' ' + inviteLink)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(inviteMessage)}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
    setShowShareOptions(false);
  };

  return (
    <div className="collaboration-menu-overlay">
      <div className="collaboration-menu">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>Collaboration Menu</h2>
        
        {/* <div className="invite-options">
          <button onClick={() => setInviteOption('individual')}>Invite Individual</button>
          <button onClick={() => setInviteOption('multiple')}>Invite Multiple Users</button>
          {inviteOption && (
            <div className="invite-form">
              {inviteOption === 'individual' ? (
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                />
              ) : (
                <textarea
                  placeholder="Enter email addresses (comma-separated)"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                />
              )}
              <textarea
                placeholder="Customize your invitation message"
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
              />
            </div>
          )}
          {!isReady && <button onClick={handleReady} className="ready-btn">I'm Ready</button>}
        </div> */}

        {isReady && (
          <div className="share-options">
            <button onClick={handleCopyInviteLink}>Copy Invite Link</button>
            <button onClick={() => setShowShareOptions(true)}>Send Invitation</button>
            {showShareOptions && (
              <div className="share-buttons">
                <button onClick={() => handleShareLink('email')}>Email</button>
                <button onClick={() => handleShareLink('twitter')}>Twitter</button>
                <button onClick={() => handleShareLink('facebook')}>Facebook</button>
                <button onClick={() => handleShareLink('whatsapp')}>WhatsApp</button>
                <button onClick={() => handleShareLink('telegram')}>Telegram</button>
              </div>
            )}
          </div>
        )}

        <FileUploader socket={socket} roomId={roomId} />

        <div className="collaboration-tools">
          <button onClick={() => setShowWhiteboard(!showWhiteboard)}>
            {showWhiteboard ? 'Hide Whiteboard' : 'Show Whiteboard'}
          </button>
          {/* <button onClick={() => setShowChat(!showChat)}>
            {showChat ? 'Hide Chat' : 'Show Chat'}
          </button> */}
        </div>

        {showWhiteboard && <Whiteboard socket={socket} roomId={roomId} />}
        {showChat && <GroupChat socket={socket} roomId={roomId} />}

        <VotingSystem socket={socket} roomId={roomId} />
        
        {/* <div className="connected-users">
          <h3>Connected Users</h3>
          <div className="users-list">
            {clients.map((client) => (
              <div key={client.socketId} className="user-item">
                <Avatar name={client.username} backgroundColor={client.color} />
                <p>{client.username}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CollaborationMenu;
