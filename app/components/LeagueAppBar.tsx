'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AppBarUser from './appbar/AppBarUser';
import AppBarLogin from './appbar/AppBarLogin';

import { useCookies, CookiesProvider } from 'react-cookie';
import globals from '../globals';

import * as fetch_module from '../utils/fetch_module';
import * as userinfo_module from '../utils/caching_module';

import AppBarleagueButton from './AppBarLeagueButton';
import Image from 'next/image';
import { Button, Container } from '@mui/material';
import { ArrowOutward } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Admin from '@/pages/admin';

import MenuIcon from '@mui/icons-material/Menu';

// todo move this into a dropdown menu for mobile if width is too small
import useMediaQuery from '@mui/material/useMediaQuery';


function LeagueAppBar() {
	const header_logo = {
		width: 'auto',
		height: 'auto',
		maxWidth: '200px',
		maxHeight: '42px',
	};

	const [AuthInfo, setAuthInfo] = useState<fetch_module.User | null>(null);

	const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
	const authToken = cookies['auth-token'];

	useEffect(() => {
		console.log('LeagueAppBar: getting user info');
		userinfo_module.get_user_info().then((result) => {
			console.log('userinfo_module succeeded:', result.userInfo);
			setAuthInfo(result.userInfo);
		});
	}, [authToken]);

	// use this for dynamic resizing of menu
	const screnW = useMediaQuery('(min-width:750px)');

	return (
		<Box sx={{ height: 'auto', position: 'fixed', zIndex: 500, width: '100%' }}>
			<CookiesProvider />
			<AppBar position="static">
				<Toolbar
					style={{
						paddingRight: '10px',
						paddingLeft: '10px',
						alignItems: 'center',
						alignContent: 'space-evenly',
						justifyContent: 'space-between',
					}}
				>
					<a href="/" style={{ maxHeight: '42px', float: 'left' }}>
						<Image
							priority
							src="/assets/header.avif"
							height="3000"
							width="1170"
							style={header_logo}
							alt="League logo"
						/>
					</a>

					{screnW ? (
							<><Container
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								maxWidth: '40%',
								flex: 1,
							}}
						>
							<Button
								href="/home"
								variant="text"
								startIcon={<HomeIcon />}
								style={{ flex: 1, width: 'auto', float: 'center' }}
							>

								<Typography textAlign="center">HOME</Typography>
							</Button>
							<Button
								href="/admin"
								variant="text"
								startIcon={<AdminPanelSettingsIcon />}
								style={{ flex: 1, width: 'auto', float: 'center' }}
							>
								<Typography textAlign="right">ADMIN</Typography>
							</Button>
							<Button
								href="/leagues/"
								variant="text"
								startIcon={<DashboardIcon />}
								style={{ flex: 1, width: 'auto', float: 'center' }}
							>
								<Typography textAlign="right">LEAGUES</Typography>
							</Button>
							{/* <AppBarleagueButton /> */}
						</Container><Box>
								{AuthInfo ? (
									<AppBarUser user={AuthInfo} authToken={authToken} />
								) : (
									<AppBarLogin />
								)}
							</Box></>
						) : (
							<p> hamburger <MenuIcon /> </p>

					)}

				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default LeagueAppBar;
