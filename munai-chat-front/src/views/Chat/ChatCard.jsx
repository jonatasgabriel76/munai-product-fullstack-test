import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Paper,
} from '@mui/material';

import ChatSocketContext from './ChatSocketContext';
import MessageComponent from './components/MessageComponent';
import InfoComponent from './components/InfoComponent';

function ChatCard({ logoutHandler }) {
  const [events, setEvents] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isMessageInputValid, setIsMessageInputValid] = useState(false);
  const { socket, userName } = React.useContext(ChatSocketContext);
  const endChatRef = useRef(null);

  const setMessageInputHandler = (e) => {
    setMessageInput(e.target.value || '');
  };

  const sendMessageHandler = () => {
    if (isMessageInputValid) {
      socket.emit('send_message', messageInput.trim());
      setMessageInput('');
    }
  };

  const submitMessage = (event) => {
    event.preventDefault();
    sendMessageHandler();
  };

  const addNewEvent = (newEvent) => {
    setEvents([
      ...events,
      newEvent,
    ]);
  };

  useEffect(() => {
    if (socket != null) {
      socket.on('info', (message) => {
        const newEvent = {
          type: 'info',
          message: message?.message,
        };
        addNewEvent(newEvent);
      });

      socket.on('message', (data) => {
        const newEvent = {
          type: 'message',
          name: data?.name,
          message: data?.message,
          hour: data?.hour,
          isAuthor: data?.userId === socket?.id,
        };
        addNewEvent(newEvent);
      });
    }
  }, [socket, events]);

  useEffect(() => {
    setIsMessageInputValid(!!messageInput && messageInput.trim().length > 0);
  }, [messageInput]);

  const exitChat = () => {
    logoutHandler();
  };

  const scrollChatToBottom = () => {
    endChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [events]);

  return (
    <Paper elevation={8} sx={{ width: 360, height: 500 }}>
      <Grid container direction="column" justifyContent="space-between" p={2} sx={{ height: '100%' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h5" component="div">
              Broadcast
            </Typography>
            <Typography variant="body2" component="div">
              {userName}
            </Typography>
          </Grid>

          <Grid item xs="auto">
            <Button
              variant="contained"
              size="small"
              onClick={exitChat}
            >
              Sair
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          xs
          sx={{
            border: 'solid 1px #ccc',
            borderRadius: 2,
            p: 2,
            my: 2,
            overflow: 'auto',
          }}
        >
          {
            events.map((event, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`key-${index}`}>
                {event?.type === 'message' && (
                  <MessageComponent
                    name={event?.name}
                    message={event?.message}
                    hour={event?.hour}
                    isAuthor={event?.isAuthor}
                  />
                )}
                {event?.type === 'info' && (
                  <InfoComponent message={event?.message} />
                )}
              </div>
            ))
          }
          <div ref={endChatRef} />
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <form onSubmit={submitMessage}>
              <TextField
                id="name-input"
                variant="outlined"
                size="small"
                placeholder="Mensagem"
                value={messageInput}
                onChange={setMessageInputHandler}
                fullWidth
              />
            </form>
          </Grid>

          <Grid item xs="auto">
            <Button
              variant="contained"
              onClick={sendMessageHandler}
              disabled={!isMessageInputValid}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

ChatCard.propTypes = {
  logoutHandler: PropTypes.func,
};

ChatCard.defaultProps = {
  logoutHandler: () => { },
};

export default ChatCard;
