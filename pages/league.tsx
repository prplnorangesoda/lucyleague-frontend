import AppWrapper from '@/app/components/AppWrapper';
import * as fetch_mod from '@/app/utils/fetch_module';
import { Container, Paper, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LeaguePage() {
	const params = useSearchParams();
	const router = useRouter();
	const [id, setId] = useState<number | null>(null);
	const [league, setLeague] = useState<fetch_mod.LeagueReturn | null>(null);

	useEffect(() => {
		if (params) {
			console.log('LeaguePage: params exists', params);
			const paramId = params.get('id');
			if (params.size === 0) return;
			if (paramId) {
				console.log('LeaguePage: paramId exists', paramId);
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
			<Container maxWidth="lg">
				<Typography variant="h2" align="center">
					{league ? league.info.name : 'Loading'}
				</Typography>
				<Paper></Paper>
			</Container>
		</AppWrapper>
	);
}
