import theme from './theme';
import LeagueAppBar from './components/LeagueAppBar';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import React from 'react';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AppWrapper from './components/AppWrapper';

const hero = {
	height: '100%',
	maxWidth: '100%',
	padding: '0',

	backgroundImage: 'url(assets/hero/ufo.avif)',

	'background-attachment': 'fixed',
	'background-position': 'center',
	'background-repeat': 'no-repeat',
	'background-size': 'cover',
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
		<AppWrapper>
			<Container style={hero}>
				<Box sx={blur}>
					<Typography align="center" component={'span'} variant="h2">
						<Box
							sx={{
								fontWeight: 'bold',
								fontFamily: 'Monospace',
								wordBreak: 'break-word',
							}}
						>
							Passtime League
						</Box>
					</Typography>

					<Typography
						align="center"
						component={'span'}
						variant="subtitle1"
						gutterBottom
					>
						<Box sx={{ fontWeight: 'light', fontFamily: 'Monospace' }}>
							the best flipping league ever doooood...
						</Box>
					</Typography>

					<Box alignSelf="center" sx={{ mt: 4 }}>
						<Button
							startIcon={<AppRegistrationIcon />}
							variant="contained"
							href="/login"
							size="large"
						>
							<Typography component={'span'}>
								<Box sx={{ fontWeight: 'bold' }}>Register Now</Box>
							</Typography>
						</Button>
					</Box>
				</Box>
			</Container>

			<Container maxWidth="md" sx={{ mt: 1, pb: 5 }}>
				<Paper elevation={1} style={{ padding: '10%' }}>
					<Typography variant="h3" gutterBottom>
						Why us?
					</Typography>
					<Typography pb={200}>
						Cause were the best LOL (imagine this says something actually
						useful)
					</Typography>
					<Typography> If you see this tell speakers he is bald</Typography>
				</Paper>
			</Container>
		</AppWrapper>
	);
}
