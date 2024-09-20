import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import TeamRosterUser from './TeamRosterUser';

function TeamRoster() {

    return (
        <Box>
        <Paper sx={{mt: 1, p: 1}}>
        <Grid container sx={{justifyContent: "center", alignItems: "center",}}>
            <TeamRosterUser></TeamRosterUser>
            <TeamRosterUser></TeamRosterUser>
            <TeamRosterUser></TeamRosterUser>
            <TeamRosterUser></TeamRosterUser>
            <TeamRosterUser></TeamRosterUser>
            <TeamRosterUser></TeamRosterUser>
            <TeamRosterUser></TeamRosterUser>
            <TeamRosterUser></TeamRosterUser>
        </Grid>
        </Paper>
    </Box>
    )
}

export default TeamRoster;
