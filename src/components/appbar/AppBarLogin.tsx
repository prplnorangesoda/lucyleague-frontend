import React from 'react';

import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function LoginButton() {
	return (
		<Button
			startIcon={<LoginIcon />}
			variant="text"
			color="inherit"
			href="/login/"
			LinkComponent={Link}
		>
			<Typography component={'span'}>
				<Box sx={{ fontWeight: 'bold' }}>LOGIN</Box>
			</Typography>
		</Button>
	);
}
