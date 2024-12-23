'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AppBarUser from './appbar/AppBarUser';
import AppBarLogin from './appbar/AppBarLogin';

import { useCookies, CookiesProvider } from 'react-cookie';
import Image from 'next/image';
import { Button, Container } from '@mui/material';

// todo move this into a dropdown menu for mobile if width is too small
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBarCondensed from './appbar/AppBarCondensed';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { debugLog } from '../globals';

import HeaderImage from '@/public/assets/header.avif';

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
	const [domLoaded, setloaded] = useState(false);
	useEffect(() => {
		setloaded(true);
		console.log('authToken:', authToken);
	}, []);
	const [cookies] = useCookies(['auth-token']);
	useEffect(() => {
		console.log(cookies);
	}, [cookies]);
	const authToken = cookies['auth-token'];

	// use this for dynamic resizing of menu
	const screnW = useMediaQuery('(min-width:750px)');

	return (
		<Box sx={{ height: 'auto', position: 'fixed', zIndex: 500, width: '100%' }}>
			<AppBar position="static" elevation={0}>
				<Toolbar
					style={{
						alignItems: 'center',
					}}
				>
					<Link href="/" style={{ maxHeight: '42px', float: 'left' }}>
						<Image
							priority
							placeholder="blur"
							src={HeaderImage}
							height="3000" // 3000
							width="1170" // 1170
							style={header_logo}
							alt="League logo"
						/>
					</Link>
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
					{domLoaded && authToken ? (
						<AppBarUser authToken={authToken} />
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
