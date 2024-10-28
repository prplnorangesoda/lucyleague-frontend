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

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import AppWrapper from '@/src/components/AppWrapper';
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
	}, [params, setTeamID, router]);

	return (
		<Container maxWidth="xl">
			{teamId ? <TeamDivAssoc id={teamId} /> : <CircularProgress />}
		</Container>
	);
}

function TeamDivAssoc(props: { id: string }) {
	const user = useLocalUser();
	const teamDivInfo = useTeamDivAssocId(props.id);
	const data = teamDivInfo.data;
	return (
		<>
			<Paper elevation={0} style={{ padding: '20px', marginTop: '30px' }}>
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
														You are going to leave this team's roster.
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

			<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
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
			<Paper elevation={2} sx={{ p: '20px', mt: '30px' }}>
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

function TeamRosterInactive(props) {
	return <></>;
}
export default TeamDivAssocPage;
