'use client';

import theme from '@/app/theme';
import LeagueAppBar from '@/app/components/LeagueAppBar';
import UserTeamHistory from '@/app/components/UserTeamHistory';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';

import { CookiesProvider, useCookies } from 'react-cookie';

import Button from '@mui/material/Button';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import fetch_module from '@/app/utils/fetch_module';
import perms_module from '@/app/utils/parseperms';
import { Card, Stack } from '@mui/material';
import GenericCard from '@/app/components/GenericCard';
import { useRouter } from 'next/navigation';
import AppWrapper from '@/app/components/AppWrapper';

// to all my haters
/**
 * @typedef {Object} PermActProps
 * @property {import('@/app/utils/parseperms').Permissions} perms
 */
/**
 *
 * @param {PermActProps} props
 * @returns
 */
function PermissionsActions({ perms }) {
	let ret = [];

	if (perms.CREATEGAME || perms.ADMIN) {
		ret.push(<ManageGame></ManageGame>);
	}
	if (perms.CREATELEAGUE || perms.ADMIN) {
		ret.push(<ManageLeague></ManageLeague>);
	}
	if (perms.SETPERMISSIONS || perms.ADMIN) {
		ret.push(<ManageUsers></ManageUsers>);
	}

	return <Container maxWidth="xl">{ret}</Container>;
}

function Admin() {
	let [perms, setPerms] = useState(null);
	let [error, setErr] = useState(null);
	let router = useRouter();

	let [cookies] = useCookies(['auth-token']);

	useEffect(() => {
		if (cookies['auth-token']) {
			fetch_module
				.fetch_user_from_auth(cookies['auth-token'])
				.then((user) => {
					setPerms(perms_module.from_bitfield(user.permissions));
				})
				.catch((reason) => {
					setErr('API error: ' + reason);
				});
			// setTimeout(
			// 	() =>
			// 		setPerms({
			// 			ADMIN: true,
			// 			SETPERMISSIONS: false,
			// 			CREATELEAGUE: false,
			// 			CREATEGAME: false,
			// 		}),
			// 	500
			// );
		} else {
			setErr('No auth-token cookie');
			router.push('/login');
		}
	}, []);
	return (
		<AppWrapper>
			<CookiesProvider />

			<Box
				sx={{
					width: '100dvw',
					height: '100dvh',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{error ? (
					<Stack maxWidth="sm" alignSelf="center">
						<GenericCard>
							There was an error:
							<br />
							{error}
						</GenericCard>
					</Stack>
				) : (
					<></>
				)}
				{perms ? (
					<PermissionsActions perms={perms} />
				) : (
					<Stack
						height="100%"
						maxWidth="sm"
						alignSelf="center"
						direction="column"
					>
						<GenericCard variant="outlined">
							<Typography variant="h5">
								We&apos;re verifying your permissions, hold on a sec...
							</Typography>
						</GenericCard>
					</Stack>
				)}
			</Box>
		</AppWrapper>
	);
}

export default Admin;

function ManageGame(props) {
	return (
		<Paper elevation={2} style={{ padding: '15px', marginTop: '20px' }}>
			<Typography variant="h3">Manage Games</Typography>
		</Paper>
	);
}
function ManageLeague(props) {
	return (
		<Paper elevation={2} style={{ padding: '15px', marginTop: '20px' }}>
			<Typography variant="h3">Manage Leagues</Typography>
		</Paper>
	);
}
function ManageUsers(props) {
	return (
		<Paper elevation={2} style={{ padding: '15px', marginTop: '20px' }}>
			<Typography variant="h3">Manage Users</Typography>
		</Paper>
	);
}
