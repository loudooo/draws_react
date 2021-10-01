import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BasicModal from './modalAppendDrawing';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1,width:'98vw',marginBottom:8}}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{window.alert("connard")}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dessins du Babouin
          </Typography>
          <BasicModal />
        </Toolbar>
      </AppBar>
    </Box>
  );
}