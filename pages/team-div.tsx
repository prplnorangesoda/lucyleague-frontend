'use client';

// kinda ass but w/e

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';
import TeamMatchesTable from '@/src/components/TeamMatchesTable';

import TeamRoster from '@/src/components/TeamRoster';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import AppWrapper from '@/src/components/AppWrapper';
import { CircularProgress, Skeleton } from '@mui/material';
import { useTeamDivAssocId } from '@/src/modules/fetch_module';

const tagStyle = {
	'::before': {
		content: '"["',
		color: 'gray',
	},
	'::after': {
		content: '"]"',
		color: 'gray',
	},
};
function TeamDivAssocPage() {
	const [teamId, setTeamID] = useState<string | null>(null);
	const router = useRouter();
	const params = useSearchParams();

	useEffect(() => {
		if (!params) return;
		const teamid = params!.get('id');
		console.log(teamid);
		if (teamid === null) return;
		if (!teamid) router.push('home/');

		setTeamID(teamid);
	}, [params, setTeamID]);

	return (
		<Container maxWidth="xl">
			{teamId ? <TeamDivAssoc id={teamId} /> : <CircularProgress />}
		</Container>
	);
}

function TeamDivAssoc(props: { id: string }) {
	const teamDivInfo = useTeamDivAssocId(props.id);
	const data = teamDivInfo.data;
	return (
		<>
			<Paper elevation={0} style={{ padding: '20px', marginTop: '30px' }}>
				<Typography sx={{ fontWeight: 'regular' }} variant="h4">
					{data ? (
						<>
							<Box component="span" sx={tagStyle}>
								{data.team_info.team_tag}
							</Box>
							{' ' + data.team_info.team_name}
						</>
					) : (
						<Skeleton />
					)}
				</Typography>

				<Typography sx={{ fontWeight: 'light' }} variant="h6">
					<Link href="#" underline="none">
						division (here soon)
					</Link>
				</Typography>

				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Box sx={{ flexGrow: 1 }}></Box>
				</Box>
			</Paper>

			<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
				<Box>
					<Typography sx={{ fontWeight: 'regular' }} variant="h5">
						Roster
					</Typography>
				</Box>

				{data ? (
					<TeamRoster players={data.players} />
				) : (
					<Skeleton width="auto" />
				)}
			</Paper>

			<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
				<Box>
					<Typography sx={{ fontWeight: 'regular' }} variant="h5">
						Matches
					</Typography>

					<TeamMatchesTable></TeamMatchesTable>
				</Box>
			</Paper>
		</>
	);
}

export default TeamDivAssocPage;
