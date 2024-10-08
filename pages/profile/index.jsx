'use client';

// kinda ass but w/e
import theme from '@/app/theme';
import LeagueAppBar from '@/app/components/LeagueAppBar';
import UserTeamHistory from '@/app/components/UserTeamHistory';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppWrapper from '@/app/components/AppWrapper';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useSearchParams } from 'next/navigation';
import * as fetchModule from '@/app/utils/fetch_module';

import { Suspense } from 'react';

function Profile() {
	const [UserInfo, setUserInfo] = useState(null);
	const params = useSearchParams();
	const s64 = params.get('id');

	useEffect(() => {
		if (s64 || s64 !== null) {
			fetchModule.fetch_info_from_s64(s64).then(setUserInfo);
		}
	}, [s64]);

	return (
		<>
			<AppWrapper theme={theme}>
				<Container maxWidth="xl">
					<Paper elevation={2} style={{ padding: '20px', marginTop: '30px' }}>
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								flexDirection: 'row',
								justifyContent: 'center',
							}}
						>
							<Box sx={{ pr: '20px' }}>
								{UserInfo ? (
									<Avatar
										sx={{ width: 150, height: 150 }}
										variant="rounded"
										src={UserInfo.avatarurl}
									/>
								) : (
									<Avatar
										sx={{ width: 150, height: 150 }}
										variant="rounded"
										src="/assets/jotchua.avif"
									/>
								)}
							</Box>

							<Box sx={{ mt: '8px' }}>
								<Typography sx={{ fontWeight: 'regular' }} variant="h4">
									{UserInfo ? UserInfo.username : 'No user found'}
								</Typography>

								<Typography sx={{ fontWeight: 'light' }} variant="h5">
									<Link href="#" underline="none">
										no current team
									</Link>
								</Typography>
							</Box>

							<Box sx={{ flexGrow: 1 }}></Box>
						</Box>
					</Paper>

					<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
						<Box>
							<Typography sx={{ fontWeight: 'regular' }} variant="h5">
								Roster History
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
			</AppWrapper>
		</>
	);
}

export default Profile;
