import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
                            <MenuIcon />
                            </IconButton>
                            <Typography variant="Loginh6" component="div" sx={{ flexGrow: 1 }}>
                                Hospital Viewing App
                            </Typography>
                            <Button color="inherit"></Button>
                            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            {this.props.children}
      </div>
    );
  }
}
