import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from './components/app-bar';
import Home from './home';

export default function App() {
  return (
    <Box>
      <AppBar></AppBar>
      <Home></Home>
    </Box>
  );
}