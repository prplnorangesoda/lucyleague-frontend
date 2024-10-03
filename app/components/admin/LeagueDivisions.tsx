import {
	fetch_league,
	LeagueReturn,
	DivisionOptionalTeams,
} from '@/app/utils/fetch_module';
import {
	Box,
	Container,
	Button,
	FormGroup,
	Typography,
	TextField,
	Table,
	TableContainer,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	IconButton,
} from '@mui/material';
import { useCallback, useState } from 'react';

import { useCookies } from 'react-cookie';

import * as admin_module from '@/app/utils/admin_module';
import { Delete, Edit } from '@mui/icons-material';

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
						<TableCell align="center">Edit</TableCell>
						<TableCell align="center">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{divisions.length != 0 ? (
						divisions.map((value, index) => (
							<TableRow key={index}>
								<TableCell>{value.info.id}</TableCell>
								<TableCell>{value.info.name}</TableCell>
								<TableCell>{value.info.created_at}</TableCell>
								<TableCell align="right">{value.teams!.length}</TableCell>
								<TableCell align="center">
									<IconButton>
										<Edit />
									</IconButton>
								</TableCell>
								<TableCell align="center">
									<IconButton>
										<Delete />
									</IconButton>
								</TableCell>
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

const AddDivision = (props: { league: LeagueReturn }) => {
	const [divName, setName] = useState('');
	const [feedback, setFeedback] = useState('');

	let [cookies] = useCookies(['auth-token']);

	const submitDiv = useCallback(async () => {
		if (
			!confirm(
				'Are you sure you want to create a division with name ' + divName + '?'
			)
		)
			return;
		setFeedback('submitting');
		console.log(divName);
		if (divName === '') {
			setFeedback('Name must not be empty');
			return;
		}
		admin_module
			.add_new_division(
				{
					leagueid: props.league.info.id,
					name: divName,
				},
				cookies['auth-token']!
			)
			.then((division) => {
				if (division !== null) {
					setFeedback('Successful');
					setTimeout(() => {
						window.location.reload();
					}, 500);
				} else {
					setFeedback('Unsuccessful: check console');
				}
			})
			.catch((err) => {
				setFeedback('Error, check console');
				console.error(err);
			});
	}, [props.league, divName]);

	return (
		<>
			<FormGroup style={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant="h5"> Add new division </Typography>
				<TextField
					size="small"
					label="Name"
					required
					onChange={(event) => {
						setName(event.target.value);
					}}
					value={divName}
					sx={{ pb: 1 }}
				/>
				<Button onClick={submitDiv} variant="contained">
					SUBMIT
				</Button>
			</FormGroup>
			{feedback}
		</>
	);
};
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
						<Typography variant="h5" mt={2}>
							{'League name: ' + league.info.name}
						</Typography>
						<DivisionsDisplay divisions={league.divisions} />
						<AddDivision league={league} />
					</>
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
}
