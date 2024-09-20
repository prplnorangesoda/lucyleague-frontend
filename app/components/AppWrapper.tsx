import React, { PropsWithChildren } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../theme';
import CssBaseline from '@mui/material/CssBaseline';
import LeagueAppBar from './LeagueAppBar';
import AuthProvider from './AuthProvider';

export default function AppWrapper(props: PropsWithChildren<{}>) {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider />
			<CssBaseline />
			<Box
				sx={{
					width: '100dvw',
					height: '100dvh',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<LeagueAppBar />
				{props.children}
			</Box>
		</ThemeProvider>
	);
}
