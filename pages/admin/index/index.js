'use client';

import theme from '../../../app/theme';
import LeagueAppBar from '../../../app/components/LeagueAppBar';
import UserTeamHistory from '../../../app/components/UserTeamHistory';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Admin() {
	return (
		<ThemeProvider theme={theme} style={{ height: '100vh' }}>
			<CssBaseline />
			<LeagueAppBar />

			<Container maxWidth="xl">
				<Paper elevation={2} style={{ padding: '15px', marginTop: '30px' }}>
                    <Typography sx={{ fontWeight: 'regular' }} variant="h6">
                        Staff Dashboard

                        <IconButton>
                            <Badge badgeContent={1} color="primary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Typography>
				</Paper>

                <Paper elevation={2} style={{ padding: '15px', marginTop: '20px' }}>
                    <Typography sx={{ fontWeight: 'regular', mb: 1 }} variant="h6">
                            Actions
                    </Typography>

                    <span>
                    <Button variant="contained" size="large" sx={{mr: 1}} startIcon={<ManageAccountsIcon />}>
                        Manage Users 
                    </Button>

                    <Button variant="contained" size="large" sx={{mr: 1}} startIcon={<ManageHistoryIcon />}>
                        Matches 
                    </Button>

                    <Button variant="contained" size="large" sx={{mr: 1}} startIcon={<RoomPreferencesIcon />}>
                        Manage Leagues 
                    </Button>

                    </span>
				</Paper>
			</Container>
		</ThemeProvider>
	);
}

export default Admin;
