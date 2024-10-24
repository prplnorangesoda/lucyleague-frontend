import AppWrapper from '@/src/components/AppWrapper';
import { StoredLeagues } from '@/src/components/CacheProvider';
import {
	DivisionOptionalTeams,
	fetch_leagues,
	League,
	LeagueReturn,
} from '@/src/modules/fetch_module';
import { ArrowOutward } from '@mui/icons-material';
import {
	Paper,
	Typography,
	Container,
	Box,
	Stack,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	ButtonGroup,
	IconButton,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

const splitLeagues = (
	leagues: LeagueReturn[]
): [LeagueReturn[], LeagueReturn[]] => {
	let shownLeagues: LeagueReturn[] = [];
	let hiddenLeagues: LeagueReturn[] = [];
	for (let league of leagues) {
		league.info.is_hidden
			? hiddenLeagues.push(league)
			: shownLeagues.push(league);
	}
	return [shownLeagues, hiddenLeagues];
};

export default function AllLeaguesPage() {
	const [shownLeagues, setShownLeagues] = useState<LeagueReturn[] | null>(null);
	const [hiddenLeagues, setHiddenLeagues] = useState<LeagueReturn[] | null>(
		null
	);
	const [err, setErr] = useState('');
	const router = useRouter();

	useEffect(() => {
		fetch_leagues()
			.then((res) => {
				if (!res) {
					setErr('API error: Returned leagues value was not truthy');
					return;
				}
				let [splitShownLeagues, splitHiddenLeagues] = splitLeagues(res);
				setShownLeagues(splitShownLeagues);
				setHiddenLeagues(splitHiddenLeagues);
			})
			.catch(console.error);
	}, [setShownLeagues, setHiddenLeagues]);
	return (
		<Container maxWidth="md">
			<Paper sx={{ mt: 5, padding: 5 }}>
				{shownLeagues ? (
					shownLeagues.map((league, index) => (
						<Stack key={index} alignContent="center" alignItems="center">
							<Typography key={index} variant="h3" gutterBottom>
								{league.info.name}
							</Typography>
							<Container maxWidth="sm" sx={{ mb: 5 }}>
								<LeagueDisplay divisions={league.divisions} />
							</Container>
							<ButtonGroup>
								<Button
									onClick={() =>
										router.push(`/league-sign-up/?id=${league.info.id}`)
									}
									variant="contained"
									endIcon={<ArrowOutward />}
									disabled={!league.info.accepting_teams}
								>
									SIGN UP FOR THIS LEAGUE
								</Button>
								<Button
									onClick={() => router.push(`/league/?id=${league.info.id}`)}
									variant="contained"
									endIcon={<ArrowOutward />}
								>
									GO TO LEAGUE
								</Button>
							</ButtonGroup>
						</Stack>
					))
				) : (
					<></>
				)}
			</Paper>
			<Paper>
				{hiddenLeagues ? (
					hiddenLeagues.map((league, index) => (
						<Stack key={index} alignContent="center" alignItems="center">
							<Typography key={index} variant="h3">
								{league.info.name}
							</Typography>
							<Button href={`/league?id=${league.info.id}`} variant="contained">
								GO TO LEAGUE
							</Button>
						</Stack>
					))
				) : (
					<></>
				)}
			</Paper>
		</Container>
	);
}
function LeagueDisplay({ divisions }: { divisions: DivisionOptionalTeams[] }) {
	return (
		<TableContainer>
			<Typography variant="h6" gutterBottom>
				Divisions
			</Typography>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Go to division table</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{divisions.length != 0 ? (
						divisions.map((div) => (
							<TableRow key={div.info.name}>
								<TableCell>{div.info.name}</TableCell>
								<TableCell align="right">
									<IconButton href={'/division-table/?id=' + div.info.id}>
										<ArrowOutward />
									</IconButton>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell>There are no divisions for this league.</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
