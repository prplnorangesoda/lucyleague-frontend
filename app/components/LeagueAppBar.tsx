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
import * as userinfo_module from '../utils/userinfo_module';

import AppBarleagueButton from './AppBarLeagueButton';
import Image from 'next/image';
import { Button, Container } from '@mui/material';
import { ArrowOutward } from '@mui/icons-material';

function LeagueAppBar() {
	const header_logo = {
		width: 'auto',
		height: 'auto',
		'max-width': '200px',
		'max-height': '42px',
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

	return (
		<Box sx={{ height: 'auto' }}>
			<CookiesProvider />
			<AppBar position="static">
				<Toolbar
					style={{
						paddingRight: '10px',
						paddingLeft: '10px',
						alignItems: 'center',
						alignContent: 'space-evenly',
						justifyContent: 'space-between',
						gap: 'auto',
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
					<Container
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Button href="/home" variant="text" style={{ float: 'left' }}>
							<Typography textAlign="center" pt="5px">
								HOME
							</Typography>
						</Button>
						<Button
							href="/admin"
							variant="text"
							endIcon={<ArrowOutward></ArrowOutward>}
							style={{ float: 'right' }}
						>
							<Typography textAlign="right" pt="5px">
								ADMIN
							</Typography>
						</Button>
						<AppBarleagueButton />
					</Container>

					{AuthInfo ? <AppBarUser user={AuthInfo} /> : <AppBarLogin />}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default LeagueAppBar;
