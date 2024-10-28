'use client';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

function TeamMatchesTable() {
	return <Typography>pretend theres matches here</Typography>;
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell> Game </TableCell>
						<TableCell> Map(s) </TableCell>
						<TableCell> Date </TableCell>
						<TableCell> Home </TableCell>
						<TableCell> Score </TableCell>
						<TableCell> Away </TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					<TableRow>
						<TableCell>
							{' '}
							<Link href="#" underline="hover">
								Match 1
							</Link>{' '}
						</TableCell>
						<TableCell>
							{' '}
							<Link href="#" underline="hover">
								pass_arena2_b14
							</Link>
							,{' '}
							<Link href="#" underline="hover">
								{' '}
								pass_shart{' '}
							</Link>{' '}
						</TableCell>
						<TableCell> 09/17/1970 09:30 PM EST </TableCell>
						<TableCell>
							{' '}
							<Link href="#" underline="hover">
								{' '}
								Team #1{' '}
							</Link>{' '}
						</TableCell>
						<TableCell> - </TableCell>
						<TableCell>
							{' '}
							<Link href="#" underline="hover">
								{' '}
								Team #2{' '}
							</Link>{' '}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default TeamMatchesTable;
