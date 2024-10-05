import { io } from 'socket.io-client';

export const initSocket = () => {
  const options = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
  };
  return io(process.env.REACT_APP_SERVER_URL, options);
};