import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';

function InfoComponent({ message }) {
  return (
    <Box textAlign="center" my={1}>
      <Typography variant="caption" component="div" sx={{ color: '#757575' }}>
        {message || ''}
      </Typography>
    </Box>
  );
}

InfoComponent.propTypes = {
  message: PropTypes.string,
};

InfoComponent.defaultProps = {
  message: '',
};

export default InfoComponent;
