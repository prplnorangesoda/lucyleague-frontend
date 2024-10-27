'use client';
import AppWrapper from '@/src/components/AppWrapper';
import GenericCard from '@/src/components/GenericCard';
import MetaInfo from '@/src/components/MetaInfo';
import { add_new_team_div_assoc } from '@/src/modules/admin_module';
import {
	useLeagueId,
	User,
	UserResponseDeep,
	useUserAuthTokenDeep,
	useUserS64Deep,
} from '@/src/modules/fetch_module';
import { useLocalUser } from '@/src/modules/hooks';
import { ArrowOutward } from '@mui/icons-material';
import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function LeagueSignUpPage() {
	const [actualLeagueId, setActualLeagueId] = useState('');
	const params = useSearchParams();
	const user = useLocalUser();
	const router = useRouter();

	const league = params!.get('id');

	if (!league)
		return (
			<Stack minHeight="100%" maxWidth="sm" alignSelf="center">
				<GenericCard>
					<Typography>
						Because of Next.js crap, you&apos;re gonna have to sit and wait here
						until the search params decide to wake up.
					</Typography>
					<Typography>
						If it takes more than 2 seconds to get off this page, go to another
						one. This means your &quot;id&quot; parameter (the one in the link)
						is missing or incorrect.
					</Typography>
				</GenericCard>
			</Stack>
		);

	return (
		<Stack maxWidth="sm" alignSelf="center" minHeight="100%" padding={2}>
			<GenericCard>
				<Typography variant="h4"> Signing up for a league </Typography>
				{user ? (
					<SignUpForm user={user} leagueId={league} />
				) : (
					<Skeleton height="100px" />
				)}
			</GenericCard>
		</Stack>
	);
}
function SignUpForm({
	user,
	leagueId,
}: {
	user: UserResponseDeep;
	leagueId: string;
}) {
	const leagueSwr = useLeagueId(leagueId);
	const [team, setTeam] = useState('');
	const handleTeamChange = useCallback(
		(event: SelectChangeEvent) => {
			setTeam(event.target.value as string);
		},
		[setTeam]
	);
	const [privacy, setPrivacy] = useState('joinreq');
	const handlePrivacyChange = useCallback(
		(event: SelectChangeEvent) => {
			setPrivacy(event.target.value as string);
		},
		[setPrivacy]
	);
	const [cookies] = useCookies(['auth-token']);
	const authtoken = cookies['auth-token'];
	const postTeamDivAssoc = useCallback(() => {
		if (team === '') return;
		if (!authtoken) return;
		add_new_team_div_assoc(
			{
				leagueid: parseInt(leagueId),
				teamid: parseInt(team),
				is_private: privacy === 'private',
			},
			authtoken
		);
	}, [team, leagueId, privacy]);

	return user.ownerships.length != 0 ? (
		<Stack style={{ gap: 10 }} alignItems="center">
			{leagueSwr.data ? (
				<>
					<Typography>
						{'Signing up for: ' + leagueSwr.data.info.name}
					</Typography>
					<MetaInfo title={'signing up for: ' + leagueSwr.data.info.name} />
				</>
			) : (
				<></>
			)}
			<FormControl fullWidth required>
				<InputLabel id="team-select-label">Team</InputLabel>
				<Select
					labelId="team-select-label"
					id="team-select"
					value={team}
					label="Team"
					onChange={handleTeamChange}
				>
					{user.ownerships.map((ownership) => (
						<MenuItem key={ownership.id} value={ownership.id}>
							{`[${ownership.team_tag}] ${ownership.team_name}`}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth required>
				<InputLabel id="select-team-privacy-label">Team privacy</InputLabel>
				<Select
					labelId="select-team-privacy-label"
					id="select-team-privacy"
					value={privacy}
					label="Team privacy"
					onChange={handlePrivacyChange}
				>
					<MenuItem value={'joinreq'}>Allow join requests</MenuItem>
					<MenuItem value={'private'}>Invite-only</MenuItem>
				</Select>
			</FormControl>
			<Button
				variant="contained"
				endIcon={<ArrowOutward />}
				onClick={postTeamDivAssoc}
			>
				SIGN UP
			</Button>
		</Stack>
	) : (
		<Typography>
			You own no teams. Would you like to{' '}
			<Link href="/team-create/">create a new one?</Link>
		</Typography>
	);
}
