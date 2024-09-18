'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AppBarUser from './appbar/AppBarUser';
import AppBarLogin from './appbar/AppBarLogin';

import { useCookies } from 'react-cookie';
import globals from '../globals';

import fetch_module from '../utils/fetch_module';

import AppBarleagueButton from './AppBarLeagueButton';
import Image from 'next/image';

function LeagueAppBar() {
	const header_logo = {
		width: 'auto',
		height: 'auto',
		'max-width': '200px',
		'max-height': '42px',
	};

	const [AuthInfo, setAuthInfo] = useState(null);

	const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
	const authToken = cookies['auth-token'];

	useEffect(() => {
		if(authToken) {
			fetch_module.fetch_info_from_auth(authToken)
			.then(setAuthInfo)
			.catch(console.error)
		}
	}, [authToken])
	// this is so lame. only useEffect can access the window object,
	// so to preload the login url, we have to use useffect
	const [href, setHref] = useState("");

	useEffect(() => {
		setHref(`${globals.trim_port(window.location.origin)}${globals.API_MIDDLE}login`)
	}, [])

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar style={{ paddingRight: '10px', paddingLeft: '10px' }}>
					<a href="/" style={{ maxHeight: '42px'}}>
						<Image src="/assets/header.png" height="54" width="200" style={header_logo} alt="League logo" />
					</a>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Heyyyyyyyyyyyyy
					</Typography>
					<AppBarleagueButton/>
					{AuthInfo ? (
						<AppBarUser
							username={AuthInfo.username}
							pfpurl={AuthInfo.avatarurl}
							s64={AuthInfo.steamid}
						/>
					) : <AppBarLogin />}
				</Toolbar>
			</AppBar>
		</Box>
	);	
}

export default LeagueAppBar;


