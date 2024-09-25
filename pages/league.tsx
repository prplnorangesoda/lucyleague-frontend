import AppWrapper from '@/app/components/AppWrapper';
import { League } from '@/app/utils/fetch_module';
import { Container, Paper, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LeaguePage() {
	const params = useSearchParams();
	const [league, setLeague] = useState<League | null>({
		id: 1,
		name: 'Hey This Is the League title',
		accepting_teams: true,
		created_at: new Date(),
		is_hidden: false,
	});

	return (
		<AppWrapper>
			<Container maxWidth="lg">
				<Typography variant="h2" align="center">
					{league ? league.name : <></>}
				</Typography>
				<Paper></Paper>
			</Container>
		</AppWrapper>
	);
}
