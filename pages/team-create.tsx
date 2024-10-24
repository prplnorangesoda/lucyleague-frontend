import GenericCard from '@/src/components/GenericCard';
import { add_new_team } from '@/src/modules/admin_module';
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

export default function TeamSignUpPage(props) {
	return (
		<Stack
			maxWidth="sm"
			direction="column"
			justifyContent="space-between"
			alignSelf="center"
			flex="1 1"
		>
			<GenericCard elevation={0}>
				<Stack gap={2} padding={2} paddingTop={2} paddingBottom={2}>
					<Typography component="h1" variant="h4">
						Creating a new team
					</Typography>
					<CreateNewTeamMenu />
				</Stack>
			</GenericCard>
		</Stack>
	);
}
function CreateNewTeamMenu(props) {
	const router = useRouter();
	const [teamName, setTeamName] = useState('');
	const [teamTag, setTeamTag] = useState('');

	const [cookies] = useCookies(['auth-token']);

	const postTeam = async () => {
		let authtoken = cookies['auth-token'];
		if (!authtoken) router.push('/login');
		let team = await add_new_team(
			{
				team_name: teamName,
				team_tag: teamTag,
			},
			authtoken
		);
		if (team === null) {
			console.error('Team is null');
		} else {
			router.push(`/team?id=${team.id}`);
		}
	};

	return (
		<>
			{/* {league ? (
				<Typography>Signing up for: {league.info.name}</Typography>
			) : (
				<></>
			)} */}

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
				{/* 
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
					</Select> */}
			</FormControl>
			<Button style={{ flex: 0 }} variant="contained" onClick={postTeam}>
				CREATE A NEW TEAM
			</Button>
		</>
	);
}
