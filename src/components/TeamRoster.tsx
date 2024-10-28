import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

import TeamRosterUser from './TeamRosterUser';
import { User, UserAndAssoc } from '../modules/fetch_module';

function TeamRosterActive(props: { players: UserAndAssoc[] }) {
	return (
		<Box>
			<Paper sx={{ mt: 1, p: 1 }}>
				<Grid2
					container
					sx={{ justifyContent: 'center', alignItems: 'center' }}
				>
					{props.players.map((player) => (
						<TeamRosterUser player={player.user} key={player.user.id} />
					))}
				</Grid2>
			</Paper>
		</Box>
	);
}

export default TeamRosterActive;
