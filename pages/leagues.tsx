import AppWrapper from '@/app/components/AppWrapper';
import { StoredLeagues } from '@/app/components/CacheProvider';
import {
	DivisionOptionalTeams,
	fetch_leagues,
	League,
	LeagueReturn,
} from '@/app/utils/fetch_module';
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
} from '@mui/material';
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
		<AppWrapper>
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
								<Button
									href={`/league?id=${league.info.id}`}
									variant="contained"
								>
									GO TO LEAGUE
								</Button>
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
								<Button
									href={`/league?id=${league.info.id}`}
									variant="contained"
								>
									GO TO LEAGUE
								</Button>
							</Stack>
						))
					) : (
						<></>
					)}
				</Paper>
			</Container>
		</AppWrapper>
	);
}
function LeagueDisplay({ divisions }: { divisions: DivisionOptionalTeams[] }) {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{divisions.length != 0 ? (
						divisions.map((div) => <TableRow>{div.info.name}</TableRow>)
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
