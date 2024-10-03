import React, { PropsWithChildren } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../theme';
import CssBaseline from '@mui/material/CssBaseline';
import LeagueAppBar from './LeagueAppBar';
import AuthProvider from './CacheProvider';

export default function AppWrapper(props: PropsWithChildren<{}>) {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider />
			<CssBaseline />
			<LeagueAppBar />
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: 'calc(100dvh - 64px)',
					top: '64px',
					display: 'flex',
					flexDirection: 'column',
					overflowY: 'scroll',
					overflowX: 'hidden',
				}}
			>
				{props.children}
			</Box>
		</ThemeProvider>
	);
}
