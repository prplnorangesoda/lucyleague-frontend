'use client';
import React, { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import {
	Container,
	CssBaseline,
	ThemeProvider,
	Typography,
} from '@mui/material';
import globals from '@/src/globals';
import { CookiesProvider, useCookies } from 'react-cookie';

import AppWrapper from '@/src/components/AppWrapper';

const OPENID_NECESSARY_PARAMETERS = [
	'openid.ns',
	'openid.claimed_id',
	'openid.signed',
	'openid.response_nonce',
	'openid.op_endpoint',
];

export default function HandshakePage() {
	let router = useRouter();
	let [responseStatus, setResp] = useState('');
	let [errorStatus, setErr] = useState('');
	let searchParams = useSearchParams();
	let [cookies, setCookie, removeCookie] = useCookies();

	useEffect(() => {
		/**
		 * @type { {[key: string]: string}}
		 */
		let reqBody = {};
		if (searchParams === null) return;
		let entries = searchParams.entries();
		for (let [param, value] of entries) {
			for (let item of OPENID_NECESSARY_PARAMETERS) {
				if (searchParams.get(item) === null) {
					setErr('Missing request parameter: ' + item);
					return;
				}
			}
			console.log(param);
			if (reqBody[param]) return;
			// rust doesn't play nice with dots, we use underscores
			reqBody[param.replace(/\./g, '__')] = value;
		}
		if (Object.keys(reqBody).length === 0) {
			return;
		}
		// fetch

		fetch(globals.API_BASE + 'verifylogin', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reqBody),
		}).then(async (_resp) => {
			try {
				if (_resp.status != 200 && _resp.status != 400) {
					throw (
						'There was an internal error. Response text: ' +
						(await _resp.text())
					);
				}
				/**
				 * @typedef {{token: string, expires: string}} Token
				 */
				/**
				 * @type {{valid: boolean, token_info: Token?}}
				 */
				let resp = await _resp.json();
				console.log(resp);
				if (!resp.token_info) {
					throw new Error('Login was not valid');
				}
				setResp(
					`valid: ${resp.valid}, token_info: {token: ${resp.token_info.token}, expires: ${resp.token_info.expires}}`
				);

				setCookie('auth-token', resp.token_info.token, {
					expires: new Date(resp.token_info.expires),
					sameSite: 'lax',
					path: '/',
				});

				console.log('Setting cookies');
				console.log(cookies);
				router.push('/home');
			} catch (err) {
				console.log(_resp);
				setErr(err);
			}
		});
	}, [searchParams]);
	return (
		<>
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
						<Container maxWidth="sm">{responseStatus}</Container>
					) : (
						<>
							<Typography fontWeight="bold" margin="auto">
								Just wait a second! We&apos;re verifying your login with
								Steam...
							</Typography>
							<Typography fontWeight="light" fontStyle="italic" pb="100px">
								(If this is taking a while, let lucy know... she did this part)
							</Typography>
						</>
					)}
				</Container>
			)}
		</>
	);
}
