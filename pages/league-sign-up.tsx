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
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

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
					<SignUpForLeague leagueid={id ? id : -1} />
				</GenericCard>
			</Stack>
		</AppWrapper>
	);
}
function SignUpForLeague(props: { leagueid: number }) {
	const router = useRouter();
	const [privacy, setPrivacy] = useState('');
	const [teamName, setTeamName] = useState('');
	const [teamTag, setTeamTag] = useState('');

	const [cookies] = useCookies(['auth-token']);
	const handleChange = (event: SelectChangeEvent) => {
		setPrivacy(event.target.value as string);
	};

	const postTeam = async () => {
		let authtoken = cookies['auth-token'];
		if (!authtoken) router.push('/login');
		let team = await add_new_team(
			{
				leagueid: props.leagueid,
				privacy: privacy,
				team_name: teamName,
				team_tag: teamTag,
			},
			authtoken
		);
	};

	return (
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
	);
}
