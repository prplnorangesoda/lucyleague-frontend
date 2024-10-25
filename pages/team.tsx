'use client';

// kinda ass but w/e
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { CircularProgress, Skeleton } from '@mui/material';
import { useBaseTeam } from '@/src/modules/fetch_module';

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
function TeamPage() {
	const router = useRouter();
	const params = useSearchParams();

	if (!params) return <CircularProgress />;
	const teamid = params.get('id');
	console.log(teamid);
	if (teamid === null) return <CircularProgress />;

	return (
		<Container maxWidth="xl">
			<TeamTitle id={teamid} key={teamid} />

			<TeamRosters id={teamid} key={teamid} />

			<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
				<Box>
					<Typography sx={{ fontWeight: 'regular' }} variant="h5">
						Past rosters
					</Typography>
				</Box>
			</Paper>
		</Container>
	);
}

export default TeamPage;
function TeamRosters(props: { id: string }) {
	const teamSwr = useBaseTeam(props.id);
	const team = teamSwr.data;
	return (
		<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
			<Box>
				<Typography sx={{ fontWeight: 'regular' }} variant="h5">
					Current rosters
				</Typography>
			</Box>
		</Paper>
	);
}

function TeamTitle(props: { id: string }) {
	let teamSwr = useBaseTeam(props.id);

	let team = teamSwr.data;
	if (!team) return;
	return (
		<Paper elevation={0} style={{ padding: '20px', marginTop: '30px' }}>
			<>
				<Typography sx={{ fontWeight: 'regular' }} align="center" variant="h4">
					<Box component="span" sx={tagStyle}>
						{team ? team.info.team_tag : <Skeleton />}
					</Box>
					{
						// prespace the name
						team ? ' ' + team.info.team_name : <Skeleton />
					}
				</Typography>
				<Typography variant="h6">
					{'Team manager: '}
					{team ? (
						<Link href={`/profile/?id=${team.owner.steamid}`}>
							{team.owner.username}
						</Link>
					) : (
						<Skeleton />
					)}
				</Typography>
			</>
		</Paper>
	);
}
