'use client';
import Typography from '@mui/material/Typography';

import Drawer from '@mui/material/Drawer';
import React from 'react';
import Box from '@mui/material/Box';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';

import HomeIcon from '@mui/icons-material/Home';
//import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import LoginIcon from '@mui/icons-material/Login';

import * as fetch_mod from '@/app/modules/fetch_module';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

// mobile support is it's own beast so we'll do this
function AppBarCondensed(props: { user: fetch_mod.User; authToken: string }) {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const [cookies, setCookie, removeCookie, updateCookies] = useCookies([
		'auth-token',
	]);
	const router = useRouter();

	const logout = () => {
		fetch_mod.logout(props.authToken).then((was_successful) => {
			if (was_successful) {
				removeCookie('auth-token', {
					expires: new Date(0),
					path: '/',
					sameSite: 'lax',
				});
				updateCookies();
				purgeUserCache();
				window.location.reload();
			}
		});
	};

	const PushToProfile = () => {
		router.push('/profile?id=' + props.user.steamid);
	};

	const purgeUserCache = () => {
		window.localStorage.setItem('user-cache', 'null');
	};

	const Options = (
		<Box sx={{ width: 'auto' }}>
			<Box>
				<Image
					priority
					src="/assets/header.avif"
					height="42"
					width="107"
					style={{ marginLeft: '10px', marginTop: '10px' }}
					alt="League logo"
				></Image>
			</Box>
			<List>
				<ListItemButton href="/home/">
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					Home
				</ListItemButton>
				<ListItemButton href="/leagues/">
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					Leagues
				</ListItemButton>
			</List>
			<Divider />

			{props.user ? (
				<List>
					<ListItemButton href="/login/">
						<ListItemIcon></ListItemIcon>
						<Typography component={'span'}>{props.user.username}</Typography>
					</ListItemButton>
				</List>
			) : (
				<List>
					<ListItemButton href="/login/">
						<ListItemIcon>
							<LoginIcon />
						</ListItemIcon>
						<Typography component={'span'}>
							<Box sx={{ fontWeight: 'bold' }}>LOGIN</Box>
						</Typography>
					</ListItemButton>
				</List>
			)}
		</Box>
	);

	return (
		<div>
			<IconButton onClick={toggleDrawer(true)}>
				{' '}
				<MenuIcon />{' '}
			</IconButton>
			<Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
				{Options}
			</Drawer>
		</div>
	);
}

export default AppBarCondensed;
