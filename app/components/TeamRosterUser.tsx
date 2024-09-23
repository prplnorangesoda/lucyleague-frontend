'use client';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function TeamRosterUser(props) {
	return (
		<Button
			href={'/profile?id=' + props.id}
			size="large"
			variant="text"
			sx={{ pl: 1, mr: 1 }}
		>
			<Avatar sx={{ mr: 2, height: 45, width: 45 }} variant="rounded" />
			<Typography align="left">User</Typography>
		</Button>
	);
}

export default TeamRosterUser;
