'use client';

import React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/navigation';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function AppBarUser(props) {
	const router = useRouter();

	const PushTo = (url) => {
		router.push(url);
	};

	return (
		<PopupState variant="popover" popupId="AppBarLeagueButton">
			{(popupState) => (
				<div>
					<Button
						variant="text"
						{...bindTrigger(popupState)}
						endIcon={<KeyboardArrowDownIcon />}
					>
						<Typography align="right" pt="5px">
							League
						</Typography>
					</Button>
					<Menu {...bindMenu(popupState)}>
						<MenuItem onClick={popupState.close}>Season</MenuItem>
					</Menu>
				</div>
			)}
		</PopupState>
	);
}

export default AppBarUser;
