import TeamRosterUser from '@/src/components/TeamRosterUser';
import * as fetch_mod from '@/src/modules/fetch_module';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LeaguePage() {
	const params = useSearchParams();
	const router = useRouter();
	let idSafe = false;

	const { id } = router.query;

	if (id && typeof id === 'string') idSafe = true;

	return (
		<Container maxWidth="lg">
			<Paper style={{ padding: 50, marginTop: 20 }}>
				{idSafe ? <League id={id as string} /> : <CircularProgress />}
			</Paper>
		</Container>
	);
}

function League(props: { id: string }) {
	let leagueSwr = fetch_mod.useLeagueId(props.id);
	let league = leagueSwr.data;
	return (
		<>
			<Typography variant="h5">
				{' '}
				{league ? league.info.name : <Skeleton />}
			</Typography>
			{league ? (
				league.divisions.map((div) => (
					<Division key={div.info.id} div={div}></Division>
				))
			) : (
				<CircularProgress />
			)}
		</>
	);
}

function Division(props: { div: fetch_mod.DivisionOptionalTeams }) {
	return (
		<Container maxWidth="lg" style={{ margin: 10 }}>
			<Paper elevation={2} style={{ padding: 20 }}>
				<Typography align="center" variant="h4">
					{props.div.info.name}
				</Typography>
				<Typography align="center" variant="h6">
					Admins
				</Typography>
				<Container>
					{props.div.admins.length !== 0 ? (
						props.div.admins.map((admin) => (
							<Button href={'/user/?id=' + admin.inner.userid}></Button>
						))
					) : (
						<Typography variant="body2" align="center">
							there are no admins for this league
						</Typography>
					)}
				</Container>
				{props.div.teams ? (
					<DivisionTable teams={props.div.teams} />
				) : (
					(() => {
						throw new Error('Teams undefined ?');
					})()
				)}
			</Paper>
		</Container>
	);
}

function DivisionTable(props: { teams: fetch_mod.DeepTeamDivAssociation[] }) {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell sx={{ color: 'GrayText' }}>Name</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.teams.length !== 0 ? (
						props.teams.map((team) => (
							<TableRow key={team.team_info.id}>
								<TableCell>{team.team_info.team_name}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell>there are no teams in this division</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
