'use client';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import * as fetch_mod from '@/src/modules/fetch_module';
import { useCookies } from 'react-cookie';

function AppBarUser(props: {
	user: fetch_mod.UserResponseDeep;
	authToken: string;
}) {
	console.log(props.user);
	const [cookies, setCookie, removeCookie, updateCookies] = useCookies([
		'auth-token',
	]);
	const router = useRouter();

	const logout = () => {
		fetch_mod.logout(props.authToken).then((was_successful) => {
			if (was_successful) {
				removeCookie('auth-token', {
					expires: new Date(0),
					path: '/',
					sameSite: 'lax',
				});
				purgeUserCache();
				window.location.reload();
			}
		});
	};

	const PushToProfile = () => {
		router.push('/profile?id=' + props.user.info.steamid);
	};

	const purgeUserCache = () => {
		window.localStorage.setItem('user-cache', 'null');
	};

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
							{props.user.info.username ? props.user.info.username : 'username'}
						</Typography>
						<Avatar
							sx={{ ml: 2, height: 40, width: 40 }}
							variant="rounded"
							src={props.user.info.avatarurl}
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

								if (!confirm('This will log you out for a second. Continue?'))
									return;

								purgeUserCache();
								window.location.reload();
							}}
						>
							Purge local user cache
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
