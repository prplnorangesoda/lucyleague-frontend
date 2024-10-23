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
	const [TeamID, setTeamID] = useState<number | null>(null);
	const router = useRouter();
	const params = useSearchParams();

	useEffect(() => {
		if (!params) return;
		const teamid = params!.get('id');
		console.log(teamid);
		if (teamid === null) return;
		if (!teamid) router.push('home/');

		setTeamID(window.parseInt(teamid));
	}, [params, setTeamID]);

	useEffect(() => {}, [TeamID]);

	return (
		<Container maxWidth="xl">
			<Paper elevation={0} style={{ padding: '20px', marginTop: '30px' }}>
				<Typography sx={{ fontWeight: 'regular' }} variant="h4">
					<Box component="span" sx={tagStyle}>
						TAG
					</Box>{' '}
					Team #1
				</Typography>

				<Typography sx={{ fontWeight: 'light' }} variant="h6">
					<Link href="#" underline="none">
						division
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

				<TeamRoster></TeamRoster>
			</Paper>

			<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
				<Box>
					<Typography sx={{ fontWeight: 'regular' }} variant="h5">
						Matches
					</Typography>

					<TeamMatchesTable></TeamMatchesTable>
				</Box>
			</Paper>
		</Container>
	);
}

export default TeamDivAssocPage;
