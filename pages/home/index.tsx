import AppWrapper from '@/app/components/AppWrapper';
import { User } from '@/app/utils/fetch_module';
import { get_user_info } from '@/app/utils/userinfo_module';
import {
	Grid2,
	Typography,
	styled,
	Paper,
	Stack,
	Container,
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

const YouInfo = (props: { user: User }) => {
	return (
		<Container>
			<Image
				src={props.user.avatarurl}
				width="184"
				height="184"
				alt="Your profile picture"
				style={{
					maxWidth: '100%',
					maxHeight: '100%',
					aspectRatio: 1,
					objectFit: 'scale-down',
				}}
			/>
		</Container>
	);
};

export default function Home() {
	let [currentuser, setUser] = useState<User | null>(null);

	useEffect(() => {
		get_user_info().then((userInfo) => {
			setUser(userInfo.userInfo);
		});
	});

	return (
		<AppWrapper>
			<Typography align="center" variant="h3" gutterBottom>
				Home
			</Typography>
			<Grid2 container padding={5} spacing={2}>
				<Grid2 size={8}>
					<GridItem>
						<Typography variant="h5" gutterBottom>
							Your team
						</Typography>
						<Stack></Stack>
					</GridItem>
				</Grid2>
				<Grid2 size={4}>
					<GridItem>
						<Typography variant="h5" gutterBottom>
							You
						</Typography>
						<Stack>
							{currentuser ? <YouInfo user={currentuser} /> : <></>}
						</Stack>
					</GridItem>
				</Grid2>
			</Grid2>
		</AppWrapper>
	);
}
