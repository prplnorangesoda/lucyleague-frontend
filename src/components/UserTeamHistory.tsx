'use client';

import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { useUserS64Deep } from '../modules/fetch_module';
import { Link, Skeleton } from '@mui/material';

function UserTeamHistory(props: { s64: string }) {
	let userSwr = useUserS64Deep(props.s64);
	let user = userSwr.data;

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell> Team </TableCell>
						<TableCell> Roster name </TableCell>
						<TableCell> Division </TableCell>
						<TableCell> Join Date </TableCell>
						<TableCell> Leave Date </TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{user ? (
						user.rosters.length != 0 ? (
							user.rosters
								.sort((a, b) => {
									return (
										parseInt(a.user.created_at) - parseInt(b.user.created_at)
									);
								})
								.map((roster) => (
									<TableRow key={roster.team.team_info.id}>
										<TableCell>
											<Link
												href={
													'/team-div/?id=' + roster.team.association_info.id
												}
												component={NextLink}
												underline="none"
											>
												{roster.team.team_info.team_name}
											</Link>
										</TableCell>
										<TableCell>
											{roster.team.association_info.roster_name
												? roster.team.association_info.roster_name
												: '---'}
										</TableCell>
										<TableCell>
											<Link
												href={
													'/division-table/?id=' +
													roster.team.association_info.divisionid
												}
												component={NextLink}
												underline="none"
											>
												Table
											</Link>
										</TableCell>
										<TableCell>
											{new Date(roster.user.created_at).toLocaleDateString()}
										</TableCell>
										<TableCell>
											{' '}
											{roster.user.ended_at
												? new Date(roster.user.ended_at).toLocaleDateString()
												: '---'}{' '}
										</TableCell>
									</TableRow>
								))
						) : (
							<TableRow>
								<TableCell>not currently signed up to any rosters</TableCell>
							</TableRow>
						)
					) : (
						<TableRow>
							<TableCell>
								<Skeleton />
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default UserTeamHistory;
