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

import TeamRosterActive from '@/src/components/TeamRoster';

import { useRouter } from 'next/router';
import {
	Button,
	Card,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Skeleton,
} from '@mui/material';
import { useTeamDivAssocId } from '@/src/modules/fetch_module';
import { ArrowOutward, Close, X } from '@mui/icons-material';
import PopupState, {
	bindDialog,
	bindMenu,
	bindTrigger,
} from 'material-ui-popup-state';
import { useLocalUser } from '@/src/modules/hooks';
import GenericCard from '@/src/components/GenericCard';

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
	const router = useRouter();

	const { id } = router.query;
	if (typeof id === 'object') return <CircularProgress />;

	return (
		<Container
			maxWidth="xl"
			sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 5 }}
		>
			<TeamDivAssoc id={id} />
		</Container>
	);
}

function TeamDivAssoc(props: { id?: string }) {
	const user = useLocalUser();
	const teamDivInfo = useTeamDivAssocId(props.id);
	const data = teamDivInfo.data;
	return (
		<>
			{teamDivInfo.error ? (
				<GenericCard>
					There was an error, check console for more information.
					{(() => {
						console.error(teamDivInfo.error);
						return '';
					})()}
				</GenericCard>
			) : (
				<></>
			)}
			<Paper elevation={0} sx={{ p: 3 }}>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Box>
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
					</Box>
					<Box>
						{data ? (
							<PopupState variant="dialog">
								{user &&
								data.current_players.find(
									(testUser) => user.info.id === testUser.user.id
								)
									? (popupState) => (
											<div>
												<Button
													variant="contained"
													endIcon={<Close />}
													color="warning"
													{...bindTrigger(popupState)}
												>
													LEAVE TEAM
												</Button>
												<Dialog component="div" {...bindDialog(popupState)}>
													<DialogTitle> Really leave? </DialogTitle>
													<DialogContent>
														You are going to leave this team&apos;s roster.
													</DialogContent>
													<DialogActions>
														<Button
															variant="text"
															autoFocus
															onClick={() => popupState.close()}
														>
															No, I don&apos;t want to
														</Button>
														<Button
															variant="contained"
															autoFocus
															onClick={() => popupState.close()}
															color="error"
														>
															Confirm
														</Button>
													</DialogActions>
												</Dialog>
											</div>
									  )
									: !data.association_info.is_private
									? (popupState) => (
											<div>
												<Button
													variant="contained"
													endIcon={<ArrowOutward />}
													{...bindTrigger(popupState)}
												>
													REQUEST TO JOIN THIS TEAM
												</Button>
												<Dialog component="div" {...bindDialog(popupState)}>
													<DialogTitle> Signing up to: </DialogTitle>
													<DialogContent>
														{' '}
														You are sending a join request to:{' '}
														{data.team_info.team_name}
													</DialogContent>
													<DialogActions>
														<Button
															variant="contained"
															autoFocus
															onClick={() => popupState.close()}
														></Button>
													</DialogActions>
												</Dialog>
											</div>
									  )
									: (_) => {}}
							</PopupState>
						) : (
							<></>
						)}
					</Box>
				</Box>
			</Paper>

			<Paper elevation={2} sx={{ p: 3 }}>
				<Box>
					<Typography sx={{ fontWeight: 'regular' }} variant="h5">
						Roster
					</Typography>
				</Box>

				{data ? (
					<TeamRosterActive players={data.current_players} />
				) : (
					<Skeleton width="auto" />
				)}
			</Paper>
			<Paper elevation={2} sx={{ p: 3 }}>
				<Box>
					<Typography sx={{ fontWeight: 'regular' }} variant="h5">
						Past rostered players
					</Typography>
				</Box>

				{data ? (
					<TeamRosterInactive players={data.past_players} />
				) : (
					<Skeleton width="auto" />
				)}
			</Paper>

			<Paper elevation={2} sx={{ p: 3 }}>
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

function TeamRosterInactive(props) {
	return <></>;
}
export default TeamDivAssocPage;
