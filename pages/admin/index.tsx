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
import Pagination from '@mui/material/Pagination';
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

import * as fetch_module from '@/app/utils/fetch_module';
import * as perms_module from '@/app/utils/parseperms';
import {
	Card,
	Stack,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import GenericCard from '@/app/components/GenericCard';
import { useRouter } from 'next/navigation';
import AppWrapper from '@/app/components/AppWrapper';
import Grid2 from '@mui/material/Grid2';

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
	let ret: [React.ReactNode] = [<></>];

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
	let [perms, setPerms] = useState<perms_module.Permissions | null>(null);
	let [error, setErr] = useState<string | null>(null);
	let router = useRouter();

	let [cookies] = useCookies(['auth-token']);

	useEffect(() => {
		if (cookies['auth-token']) {
			fetch_module
				.fetch_user_from_auth(cookies['auth-token'])
				.then((user) => {
					if (user.permissions === 0) {
						router.push('/');
					}
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

const GridItem = styled(Paper)(({ theme }) => ({
	backgroundColor: '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	...theme.applyStyles('dark', {
		backgroundColor: '#1A2027',
	}),
}));

function ManageGame(props) {
	return (
		<Paper elevation={2} style={{ padding: 15, marginTop: 20 }}>
			<Typography variant="h4">Manage Games</Typography>
		</Paper>
	);
}
function ManageLeague(props) {
	return (
		<Paper elevation={2} style={{ padding: 15, marginTop: 20 }}>
			<Typography variant="h4">Manage Leagues</Typography>
		</Paper>
	);
}
function ManageUsers(props) {
	return (
		<Paper
			elevation={2}
			style={{ padding: 15, marginTop: 20 }}
			sx={{ flexGrow: 1 }}
		>
			<Typography variant="h4">Manage Users</Typography>
			<Grid2 container spacing={2}>
				<Grid2 size={6}>
					<GridItem>
						<Typography>User list</Typography>
						<Stack>
							<UsersList />
						</Stack>
					</GridItem>
				</Grid2>
				<Grid2 size={6}>
					<GridItem>
						<Typography>Manage user</Typography>
					</GridItem>
				</Grid2>
			</Grid2>
		</Paper>
	);
}

function UsersList() {
	let [users, setUsers] = useState([{ name: 'example' }]);

	useEffect(() => {
		setUsers([
			...users,
			{ name: 'example2' },
			{ name: 'example3' },
			{ name: 'example4' },
			{ name: 'example5' },
			{ name: 'example6' },
			{ name: 'example7' },
			{ name: 'example8' },
			{ name: 'example9' },
		]);
	}, []);

	const handleChange = (event, page: number) => {
		console.log(event, page);
	};
	return (
		<>
			<TableContainer>
				<Table>
					<TableHead style={{ color: 'gray' }}>
						<TableRow sx={{ color: 'gray' }}>
							<TableCell>Name</TableCell>
							<TableCell align="right">Example</TableCell>
							<TableCell align="right">Example</TableCell>
							<TableCell align="right">Example</TableCell>
							<TableCell align="right">Example</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow
								key={user.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{user.name}
								</TableCell>
								<TableCell align="right">Example Info</TableCell>
								<TableCell align="right">Example Info</TableCell>
								<TableCell align="right">Example Info</TableCell>
								<TableCell align="right">Example Info</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				count={20}
				page={0}
				rowsPerPage={10}
				showFirstButton
				showLastButton
				onPageChange={handleChange}
			/>
		</>
	);
}
