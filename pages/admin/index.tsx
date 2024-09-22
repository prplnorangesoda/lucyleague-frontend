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
import Image from 'next/image';

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
			<Typography variant="h4" gutterBottom>
				Manage Games
			</Typography>
		</Paper>
	);
}
function ManageLeague(props) {
	return (
		<Paper elevation={2} style={{ padding: 15, marginTop: 20 }}>
			<Typography variant="h4" gutterBottom>
				Manage Leagues
			</Typography>
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
			<Typography variant="h4" gutterBottom>
				Manage Users
			</Typography>
			<Grid2 container spacing={2}>
				<Grid2 size={7}>
					<GridItem>
						<Typography>User list</Typography>
						<Stack>
							<UsersList />
						</Stack>
					</GridItem>
				</Grid2>
				<Grid2 size={5}>
					<GridItem>
						<Typography>Manage user</Typography>
					</GridItem>
				</Grid2>
			</Grid2>
		</Paper>
	);
}

function UsersList() {
	let [page, setPage] = useState(0);
	let [rowsPerPage, setRowsPerPage] = useState(10);
	let [users, setUsers] = useState<fetch_module.User[]>([]);
	let [totalAmount, setTotalAmount] = useState(0);
	const handleChange = async (event, page: number) => {
		setUsers([]);
		console.log(event, page);
		setPage(page);
		fetch_module.fetch_users_paged(page, rowsPerPage).then((ret) => {
			if (ret) {
				setUsers(ret.users);
				setTotalAmount(ret.total_count);
			}
		});
	};

	useEffect(() => {
		handleChange(null, 0);
	}, []);

	return (
		<>
			<TableContainer>
				<Table size="small">
					<TableHead style={{ color: 'gray' }}>
						<TableRow sx={{ color: 'gray' }}>
							<TableCell align="center">Picture</TableCell>
							<TableCell>ID</TableCell>
							<TableCell>Username</TableCell>
							<TableCell align="right">SteamID64</TableCell>
							<TableCell align="right">Permissions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow
								key={user.username}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align="center">
									<Image
										alt="Profile picture"
										width="184"
										height="184"
										src={user.avatarurl}
										style={{ width: 24, height: 24 }}
									/>
								</TableCell>
								<TableCell component="th" scope="row">
									{user.id}
								</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell align="right">{user.steamid}</TableCell>
								<TableCell align="right">{user.permissions}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				count={totalAmount}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[10, 20, 50]}
				showFirstButton
				showLastButton
				onPageChange={handleChange}
				onRowsPerPageChange={(
					event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
				) => {
					console.log(event);
					if (event.target.value) {
						setRowsPerPage(parseInt(event.target.value, 10));
						handleChange(event, page);
					}
				}}
			/>
		</>
	);
}
