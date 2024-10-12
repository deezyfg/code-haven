import React, { useState } from 'react';
import FileUploader from './FileUploader';
import Whiteboard from './Whiteboard';
import './CollaborationMenu.css';

const CollaborationMenu = ({ roomId, socket, onClose, onFileUpload }) => {
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  return (
    <div className="collaboration-menu-overlay">
      <div className="collaboration-menu">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>Collaboration Menu</h2>
        
        <FileUploader socket={socket} roomId={roomId} onFileUpload={onFileUpload} />

        <div className="collaboration-tools">
          <button onClick={() => setShowWhiteboard(!showWhiteboard)}>
            {showWhiteboard ? 'Hide Whiteboard' : 'Show Whiteboard'}
          </button>
        </div>

        {showWhiteboard && <Whiteboard />}
      </div>
    </div>
  );
};

export default CollaborationMenu;
