'use client';
import React, { Suspense, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import {
	Container,
	CssBaseline,
	ThemeProvider,
	Typography,
} from '@mui/material';
import theme from '@/app/theme';
import globals from '@/app/globals';

const OPENID_NECESSARY_PARAMETERS = [
	'openid.ns',
	'openid.claimed_id',
	'openid.signed',
	'openid.response_nonce',
	'openid.op_endpoint',
];

export default function HandshakePage() {
	let [responseStatus, setResp] = useState({});
	let [errorStatus, setErr] = useState('');
	let searchParams = useSearchParams();

	useEffect(() => {
		/**
		 * @type { {[key: string]: string}}
		 */
		let reqBody = {};
		searchParams.get('h');
		for (let [param, value] of searchParams.entries()) {
			console.log(param);
			if (reqBody[param]) return;
			reqBody[param] = value;
		}
		if (Object.keys(reqBody).length === 0) {
			setErr('No request parameters.');
			return;
		}
		// fetch
		for (let item of OPENID_NECESSARY_PARAMETERS) {
			if (reqBody[item] === undefined) {
				setErr('Missing request parameter: ' + item);
				return;
			}
		}
		fetch(globals.API_BASE + 'verifylogin', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reqBody),
		}).then(async (_resp) => {
			try {
				if (_resp.status === 404) {
					throw 'API not found';
				}
				let resp = await _resp.json();
				setResp(resp);
			} catch (err) {
				console.log(_resp);
				setErr(err);
			}
		});
	}, [searchParams]);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{errorStatus ? (
				'An error occurred, report this! : ' + errorStatus
			) : (
				<Container
					maxWidth="md"
					sx={{
						height: '100vh',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{responseStatus ? (
						<Container maxWidth="sm">{responseStatus.toString()}</Container>
					) : (
						<>
							<Typography fontWeight="bold" margin="auto">
								Just wait a second! We're verifying your login with Steam...
							</Typography>
							<Typography fontWeight="light" fontStyle="italic" pb="10px">
								(If this is taking a while, let lucy know... she did this)
							</Typography>
						</>
					)}
				</Container>
			)}
		</ThemeProvider>
	);
}
