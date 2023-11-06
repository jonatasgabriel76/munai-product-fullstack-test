import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';

import ChatSocketContext, { getSocketConnection } from './ChatSocketContext';
import ChatCard from './ChatCard';
import ChatLoginCard from './ChatLoginCard';

function Chat() {
  const [showChat, setShowChat] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState('');
  const [socket, setSocket] = useState(null);

  const toggleChatHandler = () => {
    setShowChat(!showChat);
  };

  const handleLogin = (name) => {
    const newSocket = getSocketConnection();
    newSocket.emit('set_name', name);

    setSocket(newSocket);
    setUserName(name);
    setIsLogged(true);
  };

  const handleLogout = () => {
    socket.disconnect();
    setUserName('');
    setIsLogged(false);
  };

  return (
    <ChatSocketContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        socket,
        userName,
        setUserName,
        getSocketConnection,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
      >
        <Box sx={{ display: showChat ? 'block' : 'none' }}>
          {!isLogged && (
            <ChatLoginCard loginHandler={handleLogin} />
          )}
          {isLogged && (
            <ChatCard logoutHandler={handleLogout} />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton
            aria-label="chat"
            sx={{ color: '#fff', margin: 2 }}
            onClick={toggleChatHandler}
          >
            {showChat && (
              <ArrowCircleDownTwoToneIcon sx={{ scale: '200%' }} />
            )}
            {!showChat && (
              <ArrowCircleUpTwoToneIcon sx={{ scale: '200%' }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </ChatSocketContext.Provider>
  );
}

export default Chat;
