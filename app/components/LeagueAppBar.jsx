'use client'

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import LoginIcon from '@mui/icons-material/Login';
import AppBarUser from './AppBarUser';

import { useCookies } from 'react-cookie';

function LeagueAppBar(){
    const header_logo = {
      'width': 'auto',
      'height': 'auto',
      'max-width': '200px',
      'max-height': '54px'
    }

    const [cookies] = useCookies(['auth-token']);
    const authToken = cookies['auth-token'];
    const [AuthInfo, setAuthInfo] = useState(null)

    useEffect( () => {
      // we are running on the client side - hostname unnecessary
      const url = '/api/v1/user/authtoken/'

      fetch( url + authToken )
        .then((res) => res.json())
        .then((data) => {
          setAuthInfo(data)
        })
    }, [])    

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ paddingRight: '10px', paddingLeft: '10px' }}>
            <a href="/"> <img src="/assets/header.png" style={header_logo} /> </a>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
            {AuthInfo ? (
              <AppBarUser username={AuthInfo.username} pfpurl={AuthInfo.avatarurl} />
            ) : (
              <Button startIcon={<LoginIcon />}variant="blank" color="inherit" href='/login'>
                <Typography component={'span'} > 
                  <Box sx={{ fontWeight: 'bold'}}>
                    LOGIN 
                  </Box>
                </Typography>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

    );
}

export default LeagueAppBar;