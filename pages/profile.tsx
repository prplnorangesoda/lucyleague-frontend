import UserTeamHistory from '@/app/components/UserTeamHistory';
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
import { useUserS64, useUserS64Deep } from '@/app/modules/fetch_module';
import useSWR from 'swr';
import { CircularProgress, Skeleton } from '@mui/material';

function ProfilePage() {
	const params = useSearchParams();
	if (params === null) {
		throw new Error('Whatever');
	}
	const s64 = params.get('id');
	if (!s64) {
		return <CircularProgress />;
	}

	return (
		<>
			<AppWrapper>
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
			</AppWrapper>
		</>
	);
}

function UserProfile({ s64 }: { s64: string | null }) {
	if (s64 === null) return <CircularProgress />;
	const { user, isLoading, isError } = useUserS64Deep(s64);

	if (isError) {
		console.error(isError);
	}
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

			<Box sx={{ mt: '8px' }}>
				<Typography sx={{ fontWeight: 'regular' }} variant="h4">
					{isLoading || isError ? <Skeleton /> : user.info.username}
				</Typography>

				<Typography sx={{ fontWeight: 'light' }} gutterBottom variant="h5">
					{user ? (
						[
							<Typography> Manager of: </Typography>,
							user.ownerships.map((ownership) => (
								<Box key={ownership.id}>
									<Link
										key={ownership.id}
										href={`/team/?id=${ownership.id}`}
										underline="none"
									>
										{ownership.team_name}
									</Link>
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
