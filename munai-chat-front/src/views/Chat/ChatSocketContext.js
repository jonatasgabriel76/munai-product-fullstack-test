import React, { useContext } from 'react';
import { io } from 'socket.io-client';

export const getSocketConnection = () => {
  const newSocket = io('http://localhost:5000', { path: '/chat/' });
  return newSocket;
};

const ChatSocketContext = React.createContext();

export const useChatSocket = () => {
  const {
    socket,
    userName,
    setUserName,
  } = useContext(ChatSocketContext);

  return {
    socket,
    userName,
    setUserName,
  };
};

export default ChatSocketContext;
