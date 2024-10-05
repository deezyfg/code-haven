import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import './JoinRoomModal.css';

const JoinRoomModal = ({ onJoin, onClose }) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      toast.error('Room ID and username are required');
      return;
    }
    onJoin(roomId, username);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Join Room</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Join</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoomModal;
