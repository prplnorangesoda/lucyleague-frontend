import AppWrapper from '@/app/components/AppWrapper';
import { StoredLeagues } from '@/app/components/CacheProvider';
import { fetch_leagues, League } from '@/app/utils/fetch_module';
import { Paper, Typography, Container, Box, Stack } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

const splitLeagues = (leagues: League[]): [League[], League[]] => {
	let shownLeagues: League[] = [];
	let hiddenLeagues: League[] = [];
	for (let league of leagues) {
		league.is_hidden ? hiddenLeagues.push(league) : shownLeagues.push(league);
	}
	return [shownLeagues, hiddenLeagues];
};

export default function AllLeaguesPage() {
	const [shownLeagues, setShownLeagues] = useState<League[] | null>(null);
	const [hiddenLeagues, setHiddenLeagues] = useState<League[] | null>(null);
	const [err, setErr] = useState('');

	useEffect(() => {
		fetch_leagues()
			.then((res) => {
				if (!res) {
					setErr('API error: Returned leagues value was not truthy');
					return;
				}
				let [splitShownLeagues, splitHiddenLeagues] = splitLeagues(res);
				setShownLeagues(splitShownLeagues);
				setHiddenLeagues(splitHiddenLeagues);
			})
			.catch(console.error);
	}, [setShownLeagues, setHiddenLeagues]);
	return (
		<AppWrapper>
			<Container maxWidth="md">
				<Paper sx={{ mt: 5, padding: 5 }}>
					{shownLeagues ? (
						shownLeagues.map((league, index) => (
							<Stack alignContent="center" alignItems="center">
								<Typography key={index} variant="h3">
									{league.name}
								</Typography>
							</Stack>
						))
					) : (
						<></>
					)}
				</Paper>
				<Paper></Paper>
			</Container>
		</AppWrapper>
	);
}
