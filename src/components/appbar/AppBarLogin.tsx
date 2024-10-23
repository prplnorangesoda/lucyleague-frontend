import React from 'react';

import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LoginButton() {
	return (
		<Button
			startIcon={<LoginIcon />}
			variant="text"
			color="inherit"
			href="/login/"
		>
			<Typography component={'span'}>
				<Box sx={{ fontWeight: 'bold' }}>LOGIN</Box>
			</Typography>
		</Button>
	);
}
