'use client';
import AppWrapper from '@/app/components/AppWrapper';
import GenericCard from '@/app/components/GenericCard';
import {
	User,
	UserResponseDeep,
	useUserAuthTokenDeep,
	useUserS64Deep,
} from '@/app/modules/fetch_module';
import { useLocalUser } from '@/app/modules/hooks';
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
						Because of Next.js crap, you're gonna have to sit and wait here
						until the search params decide to wake up.
					</Typography>
					<Typography>
						If it takes more than 2 seconds to get off this page, go to another
						one.
					</Typography>
				</GenericCard>
			</Stack>
		);

	return (
		<Stack maxWidth="sm" alignSelf="center" minHeight="100%" padding={2}>
			<GenericCard>
				<Typography variant="h4"> Signing up for a league </Typography>
				<Typography> You are signing up for: {'example'}</Typography>
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
	const [team, setTeam] = useState('');
	const handleTeamChange = useCallback((event: SelectChangeEvent) => {
		setTeam(event.target.value as string);
	}, []);
	return user.ownerships.length != 0 ? (
		<Stack style={{ gap: 10 }} alignItems="center">
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
			<Button variant="contained" endIcon={<ArrowOutward />}>
				SIGN UP
			</Button>
		</Stack>
	) : (
		<Typography>
			You own no teams. Would you like to{' '}
			<Link href="/team-sign-up/">create a new one?</Link>
		</Typography>
	);
}
