import * as React from 'react';
import {CircularProgress,Typography,Box} from '@mui/material';

export default function Progress({value,metric,score}) {
  return (
    <Box sx={{ display: 'flex' ,position:'relative'}}>
      {score? 
        <CircularProgress variant="determinate" value={value}/>:
        <CircularProgress style={{position:'absolute',left:'45%'}}/>
      }
      {score && <div   
        style={{
            top: 0,
            left: '25%',
            bottom: 0,
            position: 'absolute',
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        <Typography
          sx={{ fontSize: 24 }}
          >{metric}</Typography>
        <Typography
          sx={{ fontSize: 24 }}
          >{`${Math.round(value)}%`}</Typography>
        </div>}

    </Box>
  );
}