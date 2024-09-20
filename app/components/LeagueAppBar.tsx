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

import fetch_module, { User } from '../utils/fetch_module';

import AppBarleagueButton from './AppBarLeagueButton';
import Image from 'next/image';
import { Button } from '@mui/material';
import { ArrowOutward } from '@mui/icons-material';

function LeagueAppBar() {
	const header_logo = {
		width: 'auto',
		height: 'auto',
		'max-width': '200px',
		'max-height': '42px',
	};

	const [AuthInfo, setAuthInfo]: [User | null, any] = useState(null);

	const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
	const authToken = cookies['auth-token'];

	useEffect(() => {
		if (authToken) {
			fetch_module
				.fetch_user_from_auth(authToken)
				.then(setAuthInfo)
				.catch(console.error);
		}
	}, [authToken]);

	return (
		<Box sx={{ height: 'auto' }}>
			<CookiesProvider />
			<AppBar position="static">
				<Toolbar style={{ paddingRight: '10px', paddingLeft: '10px' }}>
					<a href="/" style={{ maxHeight: '42px' }}>
						<Image
							src="/assets/header.png"
							height="3000"
							width="1170"
							style={header_logo}
							alt="League logo"
						/>
					</a>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Heyyyyyyyyyyyyy
					</Typography>
					<Button
						href="/admin"
						variant="text"
						endIcon={<ArrowOutward></ArrowOutward>}
					>
						<Typography textAlign="center" pt="5px">
							ADMIN
						</Typography>
					</Button>
					<AppBarleagueButton />
					{AuthInfo ? <AppBarUser user={AuthInfo} /> : <AppBarLogin />}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default LeagueAppBar;
