'use client';
import { createTheme } from '@mui/material/styles';

const themeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: '#ff7043',
			contrastText: 'rgba(255,255,255,0.87)',
		},
		secondary: {
			main: '#ff3d00',
		},
		background: {
			default: '#14141a',
			paper: '#0e0e14',
		},
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
	},
	typography: {
		fontFamily: '"Roboto", sans-serif',
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		htmlFontSize: 16,
	},
};

const theme = createTheme(themeOptions);

export default theme;
