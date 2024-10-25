import theme from '@/src/theme';
import LeagueAppBar from '@/src/components/LeagueAppBar';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import React from 'react';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AppWrapper from '@/src/components/AppWrapper';
import Grid from '@mui/material/Grid';
import { Grid2 } from '@mui/material';
import Link from 'next/link';
import MetaInfo from '@/src/components/MetaInfo';

const hero = {
	height: '100%',
	maxWidth: '100%',
	padding: '0',

	backgroundImage: 'url(assets/hero/ufo.avif)',

	backgroundAttachment: 'fixed',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
};

const blur = {
	backgroundColor: 'rgba(0, 0, 0, 0.2)',
	backdropFilter: 'blur(6px)',

	margin: '0',
	height: '50vh',
	width: 'inherit',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
};

export default function Home() {
	return (
		<>
			<MetaInfo title="welcome" description="a league for 4v4 passtime" />
			<Container style={hero}>
				<Box sx={blur}>
					<Typography align="center" component={'span'} variant="h3">
						<Box
							sx={{
								fontWeight: 'bold',
								wordBreak: 'break-word',
							}}
						>
							PASS Time League
						</Box>
					</Typography>

					<Typography
						align="center"
						component={'span'}
						variant="subtitle1"
						gutterBottom
					>
						<Box>the best flipping league ever doooood...</Box>
					</Typography>

					<Box alignSelf="center" sx={{ mt: 2 }}>
						<Button
							startIcon={<AppRegistrationIcon />}
							variant="contained"
							href="/login/"
							size="large"
						>
							<Typography component={'span'}>
								<Box sx={{ fontWeight: 'bold' }}>Register Now</Box>
							</Typography>
						</Button>
					</Box>
				</Box>
			</Container>

			<Grid2 container sx={{ mt: 4, justifyContent: 'center' }}>
				<Box sx={{ pb: 50, maxWidth: '70%' }}>
					<Typography variant="h3" gutterBottom>
						What is 4v4 PASS Time?
					</Typography>

					<Typography variant="body1" gutterBottom>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</Typography>
					<Typography variant="body1">
						You can find a more complete explanation at{' '}
						<Link href="https://passtime.tf/">passtime.tf</Link>.
					</Typography>
				</Box>
			</Grid2>
		</>
	);
}
