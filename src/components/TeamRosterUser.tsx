'use client';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { User } from '../modules/fetch_module';
import { useRouter } from 'next/router';

function TeamRosterUser(props: { player: User }) {
	const router = useRouter();
	return (
		<Button
			size="large"
			variant="text"
			onClick={() => {
				router.push('/profile/?id=' + props.player.steamid);
			}}
			sx={{ pl: 1, mr: 1 }}
		>
			<Avatar
				sx={{ mr: 2, height: 45, width: 45 }}
				src={props.player.avatarurl}
				variant="rounded"
			/>
			<Typography align="left">{props.player.username}</Typography>
		</Button>
	);
}

export default TeamRosterUser;
