import LeagueAppBar from '@/app/components/LeagueAppBar';
import theme from '@/app/theme';
import { ArrowOutward, CenterFocusStrong } from '@mui/icons-material';

import {
	Box,
	Button,
	Card,
	Container,
	CssBaseline,
	Stack,
	styled,
	ThemeProvider,
	Typography,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import AppWrapper from '@/app/components/AppWrapper';
/* https://steamcommunity.com/openid/login
?openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select
&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select
&openid.return_to=https%3A%2F%2Frgl.gg%2FLogin%2FDefault.aspx%3Fpush%3D1%26r%3D24%26dnoa.userSuppliedIdentifier%3Dhttps%253A%252F%252Fsteamcommunity.com%252Fopenid%252F&openid.realm=https%3A%2F%2Frgl.gg%2F&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0
*/

const LoginCard = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
}));
export default function LoginPage(props) {
	let [steamurl, setSteamurl] = useState('');

	let get_auth_url = () => {
		let pre_part = window.encodeURIComponent(window.location.protocol + '//');
		let identity_url = window.encodeURIComponent(window.location.host);
		let root_part = 'https://steamcommunity.com/openid/login';
		let claimed_id =
			'openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select';
		let identity = `openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select`;
		let return_part = `openid.return_to=${pre_part + identity_url}/handshake`;
		let realm = `openid.realm=${pre_part + identity_url}`;
		let mode = 'openid.mode=checkid_setup';
		let ns = 'openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0';

		return `${root_part}?${claimed_id}&${identity}&${return_part}&${realm}&${mode}&${ns}`;
	};

	useEffect(() => {
		setSteamurl(get_auth_url());
	}, [get_auth_url]);
	return (
		<AppWrapper>
			<Stack
				maxWidth="sm"
				direction="column"
				justifyContent="space-between"
				alignSelf="center"
				flex="1 1"
			>
				<LoginCard variant="outlined">
					<Typography
						component="h1"
						variant="h4"
						fontWeight="bold"
						gutterBottom
					>
						Login
					</Typography>
					<Typography gutterBottom mb="10px">
						Our login and signup system are provided by Steam.
					</Typography>
					<Button
						startIcon={<ArrowOutward />}
						href={steamurl}
						variant="contained"
					>
						<Typography fontWeight="bold">GO TO STEAM</Typography>
					</Button>
				</LoginCard>
			</Stack>
		</AppWrapper>
	);
}
