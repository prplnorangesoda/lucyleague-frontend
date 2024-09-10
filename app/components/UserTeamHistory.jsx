'use client'

import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

function AddRow(season_id, team_name, team_division, join_date, leave_date) {

}

function UserTeamHistory() {
    const theme = useTheme();

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell> Season </TableCell>            
                        <TableCell> Team </TableCell>
                        <TableCell> Division </TableCell>
                        <TableCell> Join Date </TableCell>
                        <TableCell> Leave Date </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell> Season </TableCell>            
                        <TableCell> Team </TableCell>
                        <TableCell> Division </TableCell>
                        <TableCell> Join Date </TableCell>
                        <TableCell> Leave Date </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserTeamHistory;