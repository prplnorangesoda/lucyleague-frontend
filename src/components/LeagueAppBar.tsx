'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AppBarUser from './appbar/AppBarUser';
import AppBarLogin from './appbar/AppBarLogin';

import { useCookies, CookiesProvider } from 'react-cookie';

import * as fetch_module from '../modules/fetch_module';
import * as userinfo_module from '../modules/caching_module';

import AppBarleagueButton from './AppBarLeagueButton';
import Image from 'next/image';
import { Button, Container } from '@mui/material';

// todo move this into a dropdown menu for mobile if width is too small
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBarCondensed from './appbar/AppBarCondensed';
import { useRouter } from 'next/router';

const button_style = {
	flex: '0 0 auto',
	position: 'relative',
	text_align: 'center',
};
function LeagueAppBar() {
	const router = useRouter();
	const header_logo = {
		width: 'auto',
		height: 'auto',
		maxWidth: '200px',
		maxHeight: '42px',
	};

	const [AuthInfo, setAuthInfo] =
		useState<fetch_module.UserResponseDeep | null>(null);

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
						alignItems: 'center',
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
					{
						// LEFT BUTTONS
					}
					<Container
						style={{
							display: 'flex',
							flexFlow: 'row',
							listStyle: 'none',
							alignItems: 'left',
							justifyContent: 'space-between',
							gap: 10,
							flex: 0,
						}}
					>
						<Button
							onClick={() => router.push('/home/')}
							variant="text"
							sx={{ ml: 1 }}
						>
							<Typography textAlign="center">HOME</Typography>
						</Button>
					</Container>
					<Container
						style={{
							display: 'flex',
							flexFlow: 'row',
							listStyle: 'none',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 10,
							flex: 1,
						}}
					>
						<Button
							onClick={() => router.push('/leagues/')}
							variant="text"
							sx={button_style}
						>
							<Typography textAlign="center">LEAGUES</Typography>
						</Button>
						{/* <AppBarleagueButton /> */}
					</Container>

					<Container
						style={{
							display: 'flex',
							flexFlow: 'row',
							listStyle: 'none',
							alignItems: 'right',
							justifyContent: 'space-between',
							gap: 10,
							paddingRight: 0,
							marginRight: 0,
							flex: 0,
						}}
					>
						<Button
							onClick={() => router.push('/admin/')}
							variant="text"
							sx={button_style}
						>
							<Typography textAlign="center">ADMIN</Typography>
						</Button>
					</Container>
					{AuthInfo ? (
						<AppBarUser user={AuthInfo} authToken={authToken} />
					) : (
						<AppBarLogin />
					)}
					{/* <Box>
						{AuthInfo ? (
							<AppBarUser user={AuthInfo} authToken={authToken} />
					{screnW ? (
							<><Container
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								maxWidth: '55%',
								flex: 1,
							}}
						>
							<Button
								href="/home"
								variant="text"
								startIcon={<HomeIcon />}
								style={{ width: '30%', float: 'center' }}
							>
								<Typography textAlign="center">HOME</Typography>
							</Button>
							<Button
								href="/leagues/"
								variant="text"
								startIcon={<DashboardIcon />}
								style={{ width: '30%', float: 'center' }}
							>
								<Typography textAlign="center">LEAGUES</Typography>
							</Button>
							<Button
								href="/admin"
								variant="text"
								startIcon={<AdminPanelSettingsIcon />}
								style={{ width: '30%', float: 'center' }}
							>
								<Typography textAlign="center">ADMIN</Typography>
							</Button>
						</Container><Box>
								{AuthInfo ? (
									<AppBarUser user={AuthInfo} authToken={authToken} />
								) : (
									<AppBarLogin />
								)}
							</Box></>
						) : (
						<div>
							<AppBarCondensed user={AuthInfo} authToken={authToken} />	
						</div>
					)} */}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default LeagueAppBar;
