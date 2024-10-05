import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Editor from '../components/Editor';
import Client from '../components/Client';
import Navbar from '../components/Navbar';
import ShareMenu from '../components/ShareMenu';
import CollaborationMenu from '../components/CollaborationMenu';
import { initSocket } from '../socket';
import { ACTIONS } from '../actions/actions';
import { usePostContext } from '../context/PostContext';
import './EditorPage.css';
import GroupChat from '../components/GroupChat';

const USER_STATUS = {
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  CONNECTION_FAILED: 'connection_failed',
};

const EditorPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const socketRef = useRef(null);
  const [status, setStatus] = useState(USER_STATUS.CONNECTING);
  const { setJoinedUsers } = usePostContext();
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isCollaborationMenuOpen, setIsCollaborationMenuOpen] = useState(false);
  const [username, setUsername] = useState(location.state?.username || '');

  useEffect(() => {
    const init = async () => {
      if (!username) {
        navigate('/', { state: { roomId } });
        return;
      }

      try {
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', handleErrors);
        socketRef.current.on('connect_failed', handleErrors);
        socketRef.current.on('disconnect', handleDisconnect);

        socketRef.current.emit(ACTIONS.JOIN, { roomId, username });

        socketRef.current.on(ACTIONS.JOINED, handleJoined);
        socketRef.current.on(ACTIONS.DISCONNECTED, handleDisconnected);
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => setCode(code));
        socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, ({ language }) => setLanguage(language));

        setStatus(USER_STATUS.CONNECTED);
      } catch (error) {
        handleErrors(error);
      }
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
      socketRef.current?.off(ACTIONS.CODE_CHANGE);
      socketRef.current?.off(ACTIONS.LANGUAGE_CHANGE);
    };
  }, [roomId, username, navigate]);

  const handleErrors = useCallback((e) => {
    console.error('Socket error:', e);
    toast.error(`Connection error: ${e.message}. Please try again later.`);
    setStatus(USER_STATUS.CONNECTION_FAILED);
    navigate('/');
  }, [navigate]);

  const handleDisconnect = useCallback(() => {
    toast.error('Disconnected from server. Attempting to reconnect...');
    setStatus(USER_STATUS.CONNECTING);
  }, []);

  const handleJoined = useCallback(({ clients: newClients, username, socketId }) => {
    setClients(prevClients => {
      const clientMap = new Map(prevClients.map(client => [client.socketId, client]));
      let isNewUser = false;
      newClients.forEach(client => {
        if (!clientMap.has(client.socketId)) {
          isNewUser = true;
        }
        clientMap.set(client.socketId, client);
      });
      const updatedClients = Array.from(clientMap.values());
      setJoinedUsers(updatedClients);

      if (isNewUser && socketId !== socketRef.current.id) {
        toast.success(`${username} joined the room.`);
      }

      return updatedClients;
    });

    setUsername(username);
  }, [setJoinedUsers]);

  const handleDisconnected = useCallback(({ socketId, username }) => {
    setClients(prevClients => {
      const newClients = prevClients.filter(client => client.socketId !== socketId);
      setJoinedUsers(newClients);
      return newClients;
    });
    toast.success(`${username} left the room.`);
  }, [setJoinedUsers]);

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
    socketRef.current?.emit(ACTIONS.CODE_CHANGE, { roomId, code: newCode });
  }, [roomId]);

  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    socketRef.current?.emit(ACTIONS.LANGUAGE_CHANGE, { roomId, language: newLanguage });
  }, [roomId]);

  const handleLeaveRoom = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleCollaborate = useCallback(() => {
    console.log("Collaborate clicked");
    setIsCollaborationMenuOpen(true);
  }, []);

  const handleShare = useCallback(() => {
    console.log("Share clicked");
    setIsShareMenuOpen(true);
  }, []);

  if (status === USER_STATUS.CONNECTING) {
    return <div className="connecting" aria-live="polite">Connecting...</div>;
  }

  if (status === USER_STATUS.CONNECTION_FAILED) {
    return <div className="connection-failed">Connection failed. Please try again later.</div>;
  }

  return (
    <div className="editorPageWrapper">
      <Navbar
        roomId={roomId}
        username={username}
        onLeaveRoom={handleLeaveRoom}
        onCollaborate={handleCollaborate}
        onShare={handleShare}
        isInRoom={true}
      />
      <div className="editorPageContent">
        <aside className="clientsList" aria-label="Connected Clients">
        <h3>Group Chat</h3>
        <GroupChat roomId={roomId} socket={socketRef.current} />
        <br />
        <h3>Connected Clients:</h3>
        {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </aside>
        <main className="editorContainer" role="main">
          <Editor 
            language={language} 
            code={code} 
            onChange={handleCodeChange}
            onLanguageChange={handleLanguageChange}
            roomId={roomId}
            socket={socketRef.current}
          />
        </main>
      </div>
      {isShareMenuOpen && (
        <ShareMenu
          roomId={roomId}
          onClose={() => setIsShareMenuOpen(false)}
        />
      )}
      {isCollaborationMenuOpen && (
        <CollaborationMenu
          roomId={roomId}
          socket={socketRef.current}
          onClose={() => setIsCollaborationMenuOpen(false)}
          clients={clients}
        />
      )}
    </div>
  );
};

export default EditorPage;
