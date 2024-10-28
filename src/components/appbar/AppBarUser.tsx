'use client';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import * as fetch_mod from '@/src/modules/fetch_module';
import { useCookies } from 'react-cookie';
import { debugLog } from '@/src/globals';
import { Skeleton } from '@mui/material';

function AppBarUser(props: { authToken: string }) {
	const userSwr = fetch_mod.useUserAuthTokenDeep(props.authToken);
	const user = userSwr.data;
	const [cookies, setCookie, removeCookie, updateCookies] = useCookies([
		'auth-token',
	]);
	const router = useRouter();

	const logout = useCallback(() => {
		fetch_mod.logout(props.authToken).then((was_successful) => {
			if (was_successful) {
				removeCookie('auth-token', {
					expires: new Date(0),
					path: '/',
					sameSite: 'lax',
				});
			}
		});
	}, [removeCookie]);

	const PushToProfile = useCallback(() => {
		user && router.push('/profile?id=' + user.info.steamid);
	}, [router, router.push, user]);
	return (
		<PopupState variant="popover" popupId="AppBarUserMenu">
			{(popupState) => (
				<div>
					<Button
						variant="text"
						sx={{ width: 'auto' }}
						{...bindTrigger(popupState)}
					>
						<Typography align="right">
							{user ? user.info.username : ''}
						</Typography>
						<Avatar
							sx={{ ml: 2, height: 40, width: 40 }}
							variant="rounded"
							src={user ? user.info.avatarurl : undefined}
						/>
					</Button>
					<Menu {...bindMenu(popupState)}>
						<MenuItem
							onClick={() => {
								popupState.close();
								PushToProfile();
							}}
						>
							Profile
						</MenuItem>
						<MenuItem
							onClick={() => {
								popupState.close();
								if (!confirm('Are you sure you want to log out?')) return;
								logout();
							}}
						>
							Logout
						</MenuItem>
					</Menu>
				</div>
			)}
		</PopupState>
	);
}

export default AppBarUser;
