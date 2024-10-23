'use client';

import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import { useUserS64Deep } from '../modules/fetch_module';
import { Skeleton } from '@mui/material';

function UserTeamHistory(props: { s64: string }) {
	let { user, isLoading, isError } = useUserS64Deep(props.s64);

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell> Season </TableCell>
						<TableCell> Team </TableCell>
						<TableCell> Division </TableCell>
						<TableCell> Join Date </TableCell>
						<TableCell> Leave Date </TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{user ? (
						user.rosters.length != 0 ? (
							user.rosters.map((roster) => (
								<TableRow key={roster.id}>
									<TableCell> Season </TableCell>
									<TableCell> Team </TableCell>
									<TableCell> Division </TableCell>
									<TableCell> Join Date </TableCell>
									<TableCell> Leave Date </TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell>not currently signed up to any rosters</TableCell>
							</TableRow>
						)
					) : (
						<Skeleton />
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default UserTeamHistory;
