'use client';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function AppBarUser(props) {
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
						<MenuItem onClick={popupState.close}>Profile</MenuItem>
						<MenuItem onClick={popupState.close}>Logout</MenuItem>
					</Menu>
				</div>
			)}
		</PopupState>
	);
}

export default AppBarUser;
