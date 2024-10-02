'use client';

import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/navigation';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCookies } from 'react-cookie';
import { League } from '../utils/fetch_module';
import Divider from '@mui/material/Divider';
import * as caching from '../utils/caching_module';

function AppBarLeagueButton(props) {
	const [currentLeagues, setLeagues] = useState<League[] | null>(null);
	const router = useRouter();

	const PushTo = (url) => {
		router.push(url);
	};

	useEffect(() => {
		caching.get_leagues().then((stored_leagues) => {
			setLeagues(stored_leagues.leaguesInfo);
			console.log(
				'caching_module succeeded in finding leagues:',
				stored_leagues
			);
		});
	}, []);

	useEffect(() => {
		console.log(currentLeagues);
	}, [currentLeagues]);
	return (
		<PopupState variant="popover" popupId="AppBarLeagueButton">
			{(popupState) => (
				<div style={{ flex: 1, width: 'auto' }}>
					<Button
						variant="text"
						{...bindTrigger(popupState)}
						endIcon={<KeyboardArrowDownIcon />}
						fullWidth
					>
						<Typography align="center">LEAGUES</Typography>
					</Button>
					<Menu {...bindMenu(popupState)}>
						{currentLeagues ? (
							currentLeagues
								.filter((value) => !value.is_hidden)
								.map((league) => (
									<MenuItem key={league.name} onClick={popupState.close}>
										{league.name}
									</MenuItem>
								))
						) : (
							<MenuItem key="Loading" onClick={popupState.close}>
								Loading
							</MenuItem>
						)}
						<Divider />
						<MenuItem key="AllLeagues" onClick={popupState.close}>
							All leagues
						</MenuItem>
					</Menu>
				</div>
			)}
		</PopupState>
	);
}

export default AppBarLeagueButton;
