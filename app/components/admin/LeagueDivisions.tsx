import {
	fetch_league,
	LeagueReturn,
	DivisionOptionalTeams,
} from '@/app/utils/fetch_module';
import {
	Box,
	Container,
	Button,
	Typography,
	TextField,
	Table,
	TableContainer,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
} from '@mui/material';
import { useCallback, useState } from 'react';

const DivisionsDisplay = ({
	divisions,
}: {
	divisions: DivisionOptionalTeams[];
}) => {
	return (
		<TableContainer>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Created&nbsp;at</TableCell>
						<TableCell align="right">Teams&nbsp;in&nbsp;div</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{divisions.length != 0 ? (
						divisions.map((value, index) => (
							<TableRow key={index}>
								<TableCell>{value.info.id}</TableCell>
								<TableCell>{value.info.name}</TableCell>
								<TableCell>{value.teams!.length}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<Typography pt={3} pb={3}>
								There are no divisions associated with this league.
							</Typography>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default function LeagueDivisions() {
	let [league, setLeague] = useState<LeagueReturn | null>(null);
	let [leagueInput, setInput] = useState('');
	let [feedback, setFeedback] = useState('');

	const submitDiv = useCallback(() => {}, []);

	const submitLeague = useCallback(
		async (event) => {
			setFeedback('fetching');
			let d;
			try {
				d = await fetch_league(parseInt(leagueInput, 10));
				if (d === null) {
					setFeedback('League not found');
					return;
				}
				setFeedback('');
				setLeague(d);
			} catch (err) {
				setFeedback(err.toString());
			}
		},
		[leagueInput, setLeague, setFeedback]
	);
	return (
		<Box>
			<Box sx={{ display: 'flex', width: '100%' }} flexDirection="row">
				<TextField
					sx={{ flex: 2 }}
					onChange={(event) => {
						setInput(event.target.value);
					}}
					label="League ID"
				></TextField>
				<Button
					onClick={submitLeague}
					sx={{ flex: 1, ml: 1 }}
					type="submit"
					variant="contained"
				>
					<Typography>SELECT</Typography>
				</Button>
			</Box>
			{feedback ? <Typography align="center">{feedback}</Typography> : <></>}
			<Box>
				{league ? (
					<>
						<Typography variant="h5" mt={2}>
							{'League name: ' + league.info.name}
						</Typography>
						<DivisionsDisplay divisions={league.divisions} />
						<Container>
							<Typography variant="h5"> Add new division </Typography>
							<Button onClick={() => {}} variant="contained">
								SUBMIT
							</Button>
						</Container>
					</>
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
}
