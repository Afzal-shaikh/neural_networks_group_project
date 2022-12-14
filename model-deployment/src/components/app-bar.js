import * as React from 'react';
import {AppBar,Typography,Toolbar} from '@mui/material';
import '../App.css';

export default () =>(
      <AppBar position="static">
        <Toolbar style={{textAlign:'center'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Neural Networks - Student Dataset
          </Typography>
        </Toolbar>
      </AppBar>
  )
