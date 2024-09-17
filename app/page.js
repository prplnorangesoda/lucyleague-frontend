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

const hero = {
	height: '50%',
	maxWidth: '100%',
	padding: '0',

	backgroundImage: 'url(assets/hero/ufo.png)',

	'background-attachment': 'fixed',
	'background-position': 'center',
	'background-repeat': 'no-repeat',
	'background-size': 'cover',
};

const blur = {
	'backgroundColor': 'rgba(0, 0, 0, 0.2)',
	'backdropFilter': 'blur(6px)',

	margin: '0',
	height: '100%',
	width: 'inherit',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
};

export default function Home() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LeagueAppBar />

			<Container style={hero}>
				<div style={blur}>
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

					<Box align="center" sx={{ mt: 4 }}>
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
				</div>
			</Container>

			<Paper style={{ height: '45%' }} elevation={1}></Paper>
		</ThemeProvider>
	);
}
