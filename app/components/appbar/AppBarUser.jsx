'use client';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react';

function AppBarUser(props) {
	const router = useRouter()

	const PushToProfile = () => {
		router.push("/profile?id=" + props.s64)
	}


	return (
		<PopupState variant="popover" popupId="AppBarUserMenu">
			{(popupState) => (
				<div>
					<Button variant="blank" {...bindTrigger(popupState)}>
						<Typography align="right">
							{' '}
							{props.username ? props.username : 'username'}{' '}
						</Typography>
						<Avatar
							sx={{ ml: 2, height: 40, width: 40 }}
							variant="rounded"
							src={props.pfpurl}
						/>
					</Button>
					<Menu {...bindMenu(popupState)}>
						<MenuItem onClick={PushToProfile}>Profile</MenuItem>
						<MenuItem onClick={popupState.close}>Logout</MenuItem>
					</Menu>
				</div>
			)}
		</PopupState>
	);
}

export default AppBarUser;
