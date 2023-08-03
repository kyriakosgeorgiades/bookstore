import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner: React.FC = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={5000}
        bgcolor="rgba(0, 0, 0, 0.5)"  // semi-transparent background
        sx={{ pointerEvents: "auto" }} // Using the `sx` prop for `pointerEvents`
      >
        <CircularProgress />
      </Box>
    );
  };
  

export default LoadingSpinner;
