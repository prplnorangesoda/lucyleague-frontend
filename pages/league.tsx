import TeamRosterUser from '@/src/components/TeamRosterUser';
import {
	useLeagueId,
	DivisionOptionalTeams,
	DeepTeamDivAssociation,
} from '@/src/modules/fetch_module';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Link,
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
import NextLink from 'next/link';
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
	let leagueSwr = useLeagueId(props.id);
	let league = leagueSwr.data;
	return (
		<>
			<Typography variant="h5" align="center" gutterBottom>
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

function Division(props: { div: DivisionOptionalTeams }) {
	return (
		<Container maxWidth="lg">
			<Paper elevation={2} style={{ padding: 50 }}>
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

function DivisionTable(props: { teams: DeepTeamDivAssociation[] }) {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell sx={{ color: 'GrayText' }} align="right">
							Points up
						</TableCell>
						<TableCell sx={{ color: 'GrayText' }} align="right">
							Points down
						</TableCell>
						<TableCell align="right">Total score</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.teams.length !== 0 ? (
						props.teams.map((team) => (
							<TableRow key={team.team_info.id}>
								<TableCell style={{ fontWeight: 'bold' }}>
									<NextLink
										style={{ textDecoration: 'none' }}
										href={'/team-div/?id=' + team.team_info.id}
									>
										<Link underline="hover">{team.team_info.team_name}</Link>
									</NextLink>
								</TableCell>
								<TableCell align="right">
									{team.association_info.points_up}
								</TableCell>
								<TableCell align="right">
									{team.association_info.points_down}
								</TableCell>
								<TableCell align="right" style={{ fontWeight: 'bold' }}>
									{team.association_info.points_up}
								</TableCell>
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
