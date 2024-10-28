import * as fetch_mod from '@/src/modules/fetch_module';
import { CircularProgress, Container, Paper, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LeaguePage() {
	const params = useSearchParams();
	const router = useRouter();
	let idSafe = false;

	const { id } = router.query;

	if (id && typeof id === 'string') idSafe = true;

	return (
		<Container maxWidth="lg">
			<Paper style={{ padding: 50, marginTop: 20 }}>
				{idSafe ? <League id={id as string} /> : <CircularProgress />}
			</Paper>
		</Container>
	);
}

function League(props: { id: string }) {
	let leagueSwr = fetch_mod.useLeagueId(props.id);
	let league = leagueSwr.data;
	return (
		<>
			{league ? (
				league.divisions.map((div) => (
					<Division key={div.info.id} div={div}></Division>
				))
			) : (
				<CircularProgress />
			)}
		</>
	);
}

function Division(props: { div: fetch_mod.DivisionOptionalTeams }) {
	return (
		<Container maxWidth="lg" style={{ margin: 10 }}>
			<Paper elevation={2} style={{ padding: 20 }}>
				<Typography align="center" variant="h4">
					{props.div.info.name}
				</Typography>
			</Paper>
		</Container>
	);
}
