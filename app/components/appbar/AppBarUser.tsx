'use client';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { User } from '@/app/utils/fetch_module';

function AppBarUser(props: { user: User }) {
	const router = useRouter();

	const PushToProfile = () => {
		router.push('/profile?id=' + props.user.steamid);
	};

	const purgeUserCache = () => {
		if (!confirm('This will log you out for a second. Continue?')) return;
		window.localStorage.setItem('user-cache', 'null');
		window.location.reload();
	};

	return (
		<PopupState variant="popover" popupId="AppBarUserMenu">
			{(popupState) => (
				<div>
					<Button variant="text" {...bindTrigger(popupState)}>
						<Typography align="right">
							{' '}
							{props.user.username ? props.user.username : 'username'}{' '}
						</Typography>
						<Avatar
							sx={{ ml: 2, height: 40, width: 40 }}
							variant="rounded"
							src={props.user.avatarurl}
						/>
					</Button>
					<Menu {...bindMenu(popupState)}>
						<MenuItem onClick={PushToProfile}>Profile</MenuItem>
						<MenuItem
							onClick={() => {
								purgeUserCache();
								popupState.close();
							}}
						>
							Purge local user cache
						</MenuItem>
						<MenuItem onClick={popupState.close}>Logout</MenuItem>
					</Menu>
				</div>
			)}
		</PopupState>
	);
}

export default AppBarUser;
