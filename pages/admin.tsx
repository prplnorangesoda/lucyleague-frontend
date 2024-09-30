'use client';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';

import { CookiesProvider, useCookies } from 'react-cookie';

import Button from '@mui/material/Button';
import Image from 'next/image';

import * as fetch_module from '@/app/utils/fetch_module';
import * as perms_module from '@/app/utils/parseperms';
import * as admin_module from '@/app/utils/admin_module';
import {
	Card,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Stack,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
} from '@mui/material';
import GenericCard from '@/app/components/GenericCard';
import { useRouter } from 'next/navigation';
import AppWrapper from '@/app/components/AppWrapper';
import Grid2 from '@mui/material/Grid2';
import LeagueDivisions from '@/app/components/admin/LeagueDivisions';

interface PermActProps {
	perms: perms_module.Permissions;
}
// to all my haters

function PermissionsActions({ perms }: PermActProps) {
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
	}, [cookies, router]);
	return (
		<AppWrapper>
			<CookiesProvider />

			<Box
				sx={{
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
			<Grid2 container spacing={2}>
				<Grid2 size={8}>
					<GridItem>
						<Typography gutterBottom>Current leagues</Typography>
						<Stack>
							<LeaguesList />
						</Stack>
					</GridItem>
				</Grid2>
				<Grid2 size={4}>
					<GridItem>
						<Typography gutterBottom>Create new league</Typography>
						<AddLeague />
					</GridItem>
				</Grid2>
				<Grid2 size={12}>
					<GridItem>
						<Typography gutterBottom>Manage league divisions</Typography>
						<LeagueDivisions />
					</GridItem>
				</Grid2>
			</Grid2>
		</Paper>
	);
}

function AddLeague(props) {
	let [leagueName, setLeagueName] = useState('');
	let [acceptingTeams, setAccepting] = useState(true);
	let [isHidden, setHidden] = useState(false);

	let [feedback, setFeedback] = useState('');
	let [cookies] = useCookies(['auth-token']);

	const handleSubmit = () => {
		if (
			!confirm(
				'Are you sure you want to create a league with name ' + leagueName + '?'
			)
		)
			return;
		setFeedback('submitted');
		console.log(leagueName, acceptingTeams, isHidden);
		if (leagueName === '') {
			setFeedback('Name must not be empty');
			return;
		}
		admin_module
			.add_new_league(
				{
					accepting_teams: acceptingTeams,
					is_hidden: isHidden,
					name: leagueName,
				},
				cookies['auth-token']
			)
			.then((league) => {
				if (league !== null) {
					setFeedback('Successful');
					setTimeout(() => {
						window.location.reload();
					}, 500);
				}
			});
	};

	return (
		<Stack>
			<FormGroup style={{ display: 'flex', alignItems: 'center' }}>
				<TextField
					size="small"
					label="Name"
					required
					onChange={(event) => {
						setLeagueName(event.target.value);
					}}
					value={leagueName}
					sx={{ pb: 1 }}
				/>
				<FormControlLabel
					label="Accepting teams?"
					control={
						<Checkbox
							value={acceptingTeams}
							defaultChecked
							onChange={(event, bool) => {
								setAccepting(bool);
							}}
						/>
					}
				/>
				<FormControlLabel
					label="Hidden?"
					control={
						<Checkbox
							value={isHidden}
							onChange={(event, bool) => {
								setHidden(bool);
							}}
						/>
					}
				/>
				<Button
					sx={{ pt: 1 }}
					type="submit"
					variant="contained"
					onClick={handleSubmit}
				>
					<Typography>CREATE</Typography>
				</Button>
				<Typography>{feedback}</Typography>
			</FormGroup>
		</Stack>
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
						<Typography gutterBottom>User list</Typography>
						<Stack>
							<UsersList />
						</Stack>
					</GridItem>
				</Grid2>
				<Grid2 size={5}>
					<GridItem>
						<Typography gutterBottom>Manage user</Typography>
					</GridItem>
				</Grid2>
			</Grid2>
		</Paper>
	);
}
function LeaguesList(props?: {}) {
	let [leagues, setLeagues] = useState<fetch_module.LeagueReturn[] | null>(
		null
	);

	useEffect(() => {
		fetch_module.fetch_leagues().then(setLeagues);
	}, []);
	return (
		<>
			<TableContainer>
				<Table size="small">
					<TableHead style={{ color: 'gray' }}>
						<TableRow sx={{ color: 'gray' }}>
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell align="right">Divisions</TableCell>
							<TableCell align="right">Accepting teams</TableCell>
							<TableCell align="right">Is hidden</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{leagues ? (
							leagues.map((league) => (
								<TableRow
									key={league.info.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" align="center">
										{league.info.id}
									</TableCell>
									<TableCell scope="row">{league.info.name}</TableCell>
									<TableCell align="right">{league.divisions.length}</TableCell>
									<TableCell align="right">
										{league.info.accepting_teams.toString()}
									</TableCell>
									<TableCell align="right">
										{league.info.is_hidden.toString()}
									</TableCell>
								</TableRow>
							))
						) : (
							<></>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

function UsersList() {
	let [page, setPage] = useState(0);
	let [rowsPerPage, setRowsPerPage] = useState(10);
	let [users, setUsers] = useState<fetch_module.User[]>([]);
	let [totalAmount, setTotalAmount] = useState(0);

	function handleChange(event, page: number) {
		setUsers([]);
		console.log(event, page);
		setPage(page);
	}
	useEffect(() => {
		fetch_module.fetch_users_paged(page, rowsPerPage).then((ret) => {
			if (ret) {
				setUsers(ret.users);
				setTotalAmount(ret.total_count);
			}
		});
	}, [page, rowsPerPage]);

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
					}
				}}
			/>
		</>
	);
}
