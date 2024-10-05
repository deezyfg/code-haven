import React, { useState, useEffect, useCallback } from 'react';
import Client from './Client';
import Editor from './Editor';
import Navbar from './Navbar';
import CollaborationMenu from './CollaborationMenu';
import ShareMenu from './ShareMenu';
import { initSocket } from '../socket';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Room = ({ roomId: initialRoomId }) => {
  const [clients, setClients] = useState([]);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(initialRoomId || '');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);
  const [showCollaborationMenu, setShowCollaborationMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const init = useCallback(async () => {
    try {
      const s = await initSocket();
      setSocket(s);

      s.on('connect_error', (err) => handleErrors(err));
      s.on('connect_failed', (err) => handleErrors(err));

      s.on('joined', ({ clients, username, socketId }) => {
        setClients((prev) => {
          const newClients = clients.filter(client => !prev.some(p => p.socketId === client.socketId));
          if (newClients.length > 0 && socketId !== s.id) {
            toast.success(`${username} joined the room.`);
          }
          return clients;
        });
        setIsJoining(false);
        setIsInRoom(true);
        console.log('User joined room, isInRoom set to true');
      });

      s.on('disconnected', ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => prev.filter((client) => client.socketId !== socketId));
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize socket:', error);
      toast.error('Failed to connect to the server. Please try again.');
      setIsLoading(false);
    }
  }, []);

  const handleErrors = useCallback((e) => {
    console.log('socket error', e);
    toast.error('Socket connection failed, try again later.');
    setIsJoining(false);
  }, []);

  useEffect(() => {
    init();
    return () => {
      if (socket) {
        socket.disconnect();
        socket.off('joined');
        socket.off('disconnected');
        socket.off('connect_error');
        socket.off('connect_failed');
      }
    };
  }, [init, socket]);

  useEffect(() => {
    console.log('isInRoom changed:', isInRoom);
  }, [isInRoom]);

  const joinRoom = useCallback(() => {
    if (!roomId.trim() || !username.trim()) {
      toast.error('ROOM ID & username are required');
      return;
    }

    if (socket && socket.connected) {
      setIsJoining(true);
      socket.emit('join', { roomId, username });
    } else {
      toast.error('Not connected to the server. Please try again.');
    }
  }, [roomId, username, socket]);

  const createNewRoom = useCallback((e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success('Created a new room');
  }, []);

  const leaveRoom = useCallback(() => {
    if (socket && socket.connected) {
      socket.emit('leave_room', { roomId, username });
      setRoomId('');
      setClients([]);
      setIsInRoom(false);
      setShowCollaborationMenu(false);
      setShowShareMenu(false);
      toast.success('Left the room');
    } else {
      toast.error('Not connected to the server. Please try again.');
    }
  }, [socket, roomId, username]);

  const handleInputEnter = useCallback((e) => {
    if (e.key === 'Enter') {
      joinRoom();
    }
  }, [joinRoom]);

  const toggleCollaborationMenu = useCallback(() => {
    console.log('Toggling collaboration menu, current state:', showCollaborationMenu);
    setShowCollaborationMenu(prev => !prev);
    setShowShareMenu(false);
  }, [showCollaborationMenu]);

  const toggleShareMenu = useCallback(() => {
    console.log('Toggling share menu, current state:', showShareMenu);
    setShowShareMenu(prev => !prev);
    setShowCollaborationMenu(false);
  }, [showShareMenu]);

  console.log('Rendering Room component, isInRoom:', isInRoom);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="roomWrapper">
      <Navbar 
        roomId={roomId}
        username={username}
        onLeaveRoom={leaveRoom}
        onCollaborate={toggleCollaborationMenu}
        onShare={toggleShareMenu}
        isInRoom={isInRoom}
      />
      {!isInRoom ? (
        <div className="joinForm">
          <input
            type="text"
            placeholder="ROOM ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <button onClick={joinRoom} disabled={isJoining}>
            {isJoining ? 'Joining...' : 'Join'}
          </button>
          <span>
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="/">
              new room
            </a>
          </span>
        </div>
      ) : (
        <div className="room">
          <div className="editorWrap">
            <Editor roomId={roomId} socket={socket} />
          </div>
        </div>
      )}
      {showCollaborationMenu && (
        <CollaborationMenu
          roomId={roomId}
          socket={socket}
          onClose={toggleCollaborationMenu}
          clients={clients}
        />
      )}
      {showShareMenu && (
        <ShareMenu
          roomId={roomId}
          onClose={toggleShareMenu}
        />
      )}
    </div>
  );
};

export default Room;
