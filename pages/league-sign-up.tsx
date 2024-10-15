import AppWrapper from '@/app/components/AppWrapper';
import GenericCard from '@/app/components/GenericCard';
import { add_new_team } from '@/app/modules/admin_module';
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
	Box,
	CircularProgress,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
function Waiting() {
	return (
		<AppWrapper>
			<CircularProgress />
		</AppWrapper>
	);
}

export default function LeagueSignUpPage(props) {
	const params = useSearchParams();
	if (!params) {
		return <Waiting />;
	}
	const paramId = params.get('id');
	if (!paramId) return <Waiting />;

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
					<SignUpForLeague leagueid={paramId} />
				</GenericCard>
			</Stack>
		</AppWrapper>
	);
}
function SignUpForLeague(props: { leagueid: string }) {
	if (Object.is(parseInt(props.leagueid), NaN)) {
		throw new Error('Not a valid ID passed');
	}
	const router = useRouter();
	const [privacy, setPrivacy] = useState('');
	const [teamName, setTeamName] = useState('');
	const [teamTag, setTeamTag] = useState('');
	const { league, isLoading, isError } = fetch_mod.useLeagueId(props.leagueid);

	const [cookies] = useCookies(['auth-token']);
	const handleChange = (event: SelectChangeEvent) => {
		setPrivacy(event.target.value as string);
	};

	const postTeam = async () => {
		let authtoken = cookies['auth-token'];
		if (!authtoken) router.push('/login');
		let team = await add_new_team(
			{
				leagueid: parseInt(props.leagueid),
				privacy: privacy,
				team_name: teamName,
				team_tag: teamTag,
			},
			authtoken
		);
	};

	return (
		<>
			{league ? (
				<Typography>Signing up for: {league.info.name}</Typography>
			) : (
				<></>
			)}

			<Stack gap={2} padding={5} paddingTop={2} paddingBottom={2}>
				<Box display="flex" justifyContent="space-between">
					<TextField
						label="Name"
						required
						helperText="You can modify this later."
						onChange={(event) => {
							setTeamName(event.target.value);
						}}
						value={teamName}
						sx={{ pb: 1, width: '70%' }}
					/>
					<TextField
						label="Tag"
						required
						onChange={(event) => {
							setTeamTag(event.target.value);
						}}
						value={teamTag}
						sx={{ pb: 1, width: '20%', mr: 1 }}
					/>
				</Box>

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
				<Button style={{ flex: 0 }} variant="contained" onClick={postTeam}>
					SUBMIT (ha lol this doesnt do anything yet)
				</Button>
			</Stack>
		</>
	);
}
