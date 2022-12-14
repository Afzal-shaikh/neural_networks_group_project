import * as React from 'react';
import {Box,Modal} from '@mui/material';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height:'80vh',
  overflow:'scroll'
};


export default function ModalComponent({open,component}) {
    return (
        <div>
        <Modal
            open={open}
        >
            <Box sx={style}>
                {component}
            </Box>
        </Modal>
        </div>
    );
}