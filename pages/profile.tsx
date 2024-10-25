'use client';
import UserTeamHistory from '@/src/components/UserTeamHistory';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import { useUserS64, useUserS64Deep } from '@/src/modules/fetch_module';
import { Button, CircularProgress, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import MetaInfo from '@/src/components/MetaInfo';

function ProfilePage() {
	const params = useSearchParams();
	if (params === null) {
		throw new Error('Whatever');
	}
	const s64 = params.get('id');
	if (!s64) {
		return (
			<>
				<CircularProgress />
				<MetaInfo />
			</>
		);
	}

	return (
		<Container maxWidth="md">
			<Paper elevation={2} style={{ padding: '20px', marginTop: '30px' }}>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<UserProfile s64={s64} />

					<Box sx={{ flexGrow: 1 }}></Box>
				</Box>
			</Paper>

			<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
				<Box>
					<Typography sx={{ fontWeight: 'regular' }} variant="h5">
						Roster History
					</Typography>
				</Box>
				<UserTeamHistory s64={s64} />
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
	);
}

function UserProfile({ s64 }: { s64: string }) {
	const router = useRouter();
	const userSwr = useUserS64Deep(s64);

	if (userSwr.error) {
		console.error(userSwr.error);
	}

	const user = userSwr.data;
	return (
		<>
			<Box sx={{ pr: '20px' }}>
				{user ? (
					<Avatar
						sx={{ width: 150, height: 150 }}
						variant="rounded"
						src={user.info.avatarurl}
					/>
				) : (
					<CircularProgress size={150} />
				)}
			</Box>
			{user ? <MetaInfo title={user.info.username + "'s profile"} /> : <></>}

			<Box sx={{ mt: '8px' }}>
				<Typography sx={{ fontWeight: 'regular' }} variant="h4">
					{user ? user.info.username : <Skeleton />}
				</Typography>

				<Typography sx={{ fontWeight: 'light' }} gutterBottom variant="h5">
					{user && user.ownerships.length != 0 ? (
						[
							<Typography key="lol"> Manager of: </Typography>,
							user.ownerships.map((ownership) => (
								<Box key={ownership.id}>
									<Button
										key={ownership.id}
										onClick={() => {
											router.push(`/team/?id=${ownership.id}`);
										}}
										variant="text"
										size="small"
									>
										{ownership.team_name}
									</Button>
								</Box>
							)),
						]
					) : (
						<Typography> not managing any teams</Typography>
					)}
				</Typography>
			</Box>
		</>
	);
}

export default ProfilePage;
