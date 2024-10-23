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
	const params = useSearchParams();
	const user = useLocalUser();
	const router = useRouter();

	const league = params ? params['id'] : router.push('/');
	useEffect(() => {
		if (!league) {
			router.push('/leagues/');
		}
	}, [league]);

	return (
		<Stack maxWidth="sm" alignSelf="center" minHeight="100%" padding={2}>
			<GenericCard>
				<Typography variant="h4"> Signing up for a league </Typography>
				<Typography> You are signing up for: {'example'}</Typography>
				{user ? <SignUpForm user={user} /> : <Skeleton height="100px" />}
			</GenericCard>
		</Stack>
	);
}
function SignUpForm({ user }: { user: UserResponseDeep }) {
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
