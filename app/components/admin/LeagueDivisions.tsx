import { fetch_league, LeagueReturn } from '@/app/utils/fetch_module';
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

export default function LeagueDivisions() {
	let [league, setLeague] = useState<LeagueReturn | null>(null);
	let [leagueInput, setInput] = useState('');
	let [feedback, setFeedback] = useState('');

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
						<Typography variant="h5">{league.info.name}</Typography>
						<TableContainer>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>Dessert (100g serving)</TableCell>
										<TableCell align="right">Calories</TableCell>
										<TableCell align="right">Fat&nbsp;(g)</TableCell>
										<TableCell align="right">Carbs&nbsp;(g)</TableCell>
										<TableCell align="right">Protein&nbsp;(g)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{league.divisions.length != 0 ? (
										league.divisions.map((value, index) => (
											<TableRow key={index}></TableRow>
										))
									) : (
										<TableRow>
											<Typography pt={3} pb={3}>
												{' '}
												There are no divisions associated with this league.
											</Typography>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</>
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
}
