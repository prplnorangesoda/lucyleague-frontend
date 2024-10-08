import AppWrapper from '@/app/components/AppWrapper';
import GenericCard from '@/app/components/GenericCard';
import * as fetch_mod from '@/app/modules/fetch_module';
import {
	Container,
	Paper,
	Typography,
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	TextField,
	Button,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LeagueSignUpPage(props) {
	const params = useSearchParams();
	const router = useRouter();
	const [id, setId] = useState<number | null>(null);
	const [league, setLeague] = useState<fetch_mod.LeagueReturn | null>(null);
	useEffect(() => {
		if (params) {
			console.log('LeagueSignUpPage: params exists', params);
			const paramId = params.get('id');
			if (params.size === 0) return;
			if (paramId) {
				console.log('LeagueSignUpPage: paramId exists', paramId);
				setId(parseInt(paramId));
			} else {
				router.push('/');
			}
		}
	}, [params, router, setId]);

	useEffect(() => {
		if (id) fetch_mod.fetch_league(id).then(setLeague).catch(console.error);
	}, [id]);

	return (
		<AppWrapper>
			<Stack
				maxWidth="sm"
				direction="column"
				justifyContent="space-between"
				alignSelf="center"
				flex="1 1"
			>
				<GenericCard>
					<Typography component="h1" variant="h3">
						Signing up for a league
					</Typography>
					<Typography component="p" variant="h6">
						You are signing up for: {league?.info.name}
					</Typography>
					<SignUpForLeague />
				</GenericCard>
			</Stack>
		</AppWrapper>
	);
}
function SignUpForLeague(props) {
	const [privacy, setPrivacy] = useState('');
	const [teamName, setTeamName] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setPrivacy(event.target.value as string);
	};

	return (
		<Stack gap={2} padding={5} paddingTop={2} paddingBottom={2}>
			<TextField
				label="Name"
				required
				helperText="You can modify this later."
				onChange={(event) => {
					setTeamName(event.target.value);
				}}
				value={teamName}
				sx={{ pb: 1 }}
			/>
			<FormControl required>
				<InputLabel id="select-team-privacy-label">Team privacy</InputLabel>
				<Select
					labelId="select-team-privacy-label"
					id="select-team-privacy"
					value={privacy}
					label="Team privacy"
					onChange={handleChange}
				>
					<MenuItem value={'joinreq'}>Allow join requests</MenuItem>
					<MenuItem value={'private'}>Invite-only</MenuItem>
				</Select>
			</FormControl>
			<Button style={{ flex: 0 }} variant="contained">
				SUBMIT (ha lol this doesnt do anything yet)
			</Button>
		</Stack>
	);
}
