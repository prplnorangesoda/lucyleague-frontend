import AppWrapper from '@/src/components/AppWrapper';
import { User } from '@/src/modules/fetch_module';
import {
	Grid2,
	Typography,
	styled,
	Paper,
	Stack,
	Container,
	Avatar,
	Box,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const GridItem = styled(Paper)(({ theme }) => ({
	backgroundColor: '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	...theme.applyStyles('dark', {
		backgroundColor: '#1A2027',
	}),
}));

const TeamInfo = (props: { team: any }) => {
	return <Box></Box>;
};
const UpcomingGames = (props) => {
	return <></>;
};

const YouInfo = (props: { user: User }) => {
	return (
		<Stack sx={{ display: 'flex', alignItems: 'center' }}>
			<Avatar
				variant="rounded"
				sx={{ height: 'auto', width: 'auto' }}
				src={props.user.avatarurl}
				alt="Your profile picture"
			/>
		</Stack>
	);
};

export default function Home() {
	return (
		<>
			<Typography align="center" variant="h3" gutterBottom>
				Home
			</Typography>
			<Grid2 container padding={5} spacing={2}>
				<Grid2 size={8}>
					<GridItem>
						<Typography align="left" variant="h4" gutterBottom>
							Dashboard
						</Typography>
						<Typography> What if speakers was called freakers</Typography>
					</GridItem>
				</Grid2>
				<Grid2 size={4}>
					<GridItem>
						<Typography variant="h5" gutterBottom>
							Your team
						</Typography>
						<Stack>
							<Typography>Your team will be here soon</Typography>
							<TeamInfo team />
							<UpcomingGames />
						</Stack>
					</GridItem>
				</Grid2>
			</Grid2>
		</>
	);
}
