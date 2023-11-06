import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@mui/material';

function MessageComponent({
  name,
  message,
  hour,
  isAuthor,
}) {
  return (
    <Grid
      container
      direction="column"
      alignItems={isAuthor ? 'flex-end' : 'flex-start'}
      my={1}
    >
      <Grid
        container
        direction="column"
        alignItems={isAuthor ? 'flex-end' : 'flex-start'}
        sx={{
          border: 'solid 1px',
          borderRadius: 2,
          borderColor: isAuthor ? '#eee' : '#def',
          backgroundColor: isAuthor ? '#eee' : '#def',
          padding: '1px 6px',
        }}
        xs="auto"
      >
        <Grid item>
          <Typography
            variant="caption"
            component="div"
            sx={{
              color: '#757575',
            }}
          >
            {name || ''}
            :
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2" component="div">
            {message || ''}
          </Typography>
        </Grid>

        <Grid
          item
          sx={{
            width: '100%',
            textAlign: 'end',
          }}
        >
          <Typography variant="caption" component="div" fontSize={11} color="#757575">
            {hour || ''}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

MessageComponent.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  hour: PropTypes.string,
  isAuthor: PropTypes.bool,
};

MessageComponent.defaultProps = {
  name: '',
  message: '',
  hour: '',
  isAuthor: false,
};

export default MessageComponent;
