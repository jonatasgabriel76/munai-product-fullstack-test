import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Paper,
} from '@mui/material';

function ChatLoginCard({ loginHandler }) {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!name && name.trim().length > 0);
  }, [name]);

  const setNameHandler = (e) => {
    setName(e.target.value || '');
  };

  const enterChat = () => {
    if (isValid) {
      loginHandler(name.trim());
    }
  };

  const submitName = (event) => {
    event.preventDefault();
    enterChat();
  };

  return (
    <Paper elevation={8} sx={{ width: 360, height: 500 }}>
      <Grid container direction="column" justifyContent="space-between" p={2} sx={{ height: '100%' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" component="div">
              Cadastro
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs sx={{ mt: 4 }}>
          <form onSubmit={submitName}>
            <TextField
              id="name-input"
              label="Nome"
              variant="outlined"
              value={name}
              onChange={setNameHandler}
              size="small"
              fullWidth
            />
          </form>
        </Grid>

        <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
          <Grid item xs="auto">
            <Button
              variant="contained"
              onClick={enterChat}
              disabled={!isValid}
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

ChatLoginCard.propTypes = {
  loginHandler: PropTypes.func,
};

ChatLoginCard.defaultProps = {
  loginHandler: () => { },
};

export default ChatLoginCard;
