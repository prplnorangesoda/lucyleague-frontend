'use client';

// kinda ass but w/e
import globals from '@/app/globals';
import theme from '@/app/theme';
import LeagueAppBar from '@/app/components/LeagueAppBar';
import UserTeamHistory from '@/app/components/UserTeamHistory';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';


function Profile() {
	const [TeamID, seTeamID] = useState(null);
	const params = useSearchParams();
	const teamid = params.get('id');


	return (
		<ThemeProvider theme={theme} style={{ height: '100vh' }}>
			<CssBaseline />
			<LeagueAppBar />

			<Container maxWidth="xl">
				<Paper elevation={0} style={{ padding: '20px', marginTop: '30px' }}>

                <Typography sx={{ fontWeight: 'regular' }} variant="h4">
                                [TAG]
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
							Matches
						</Typography>
					</Box>
					<UserTeamHistory></UserTeamHistory>
				</Paper>

				<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
					<Box>
						<Typography sx={{ fontWeight: 'regular' }} variant="h5">
							Punishment History
						</Typography>

						<Box sx={{ mt: '10px' }}>nothing yet...</Box>
					</Box>
				</Paper>
			</Container>
		</ThemeProvider>
	);
}

export default Profile;
