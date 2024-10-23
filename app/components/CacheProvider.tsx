'use client';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import * as fetch_module from '../modules/fetch_module';

export interface StoredUser {
	userInfo: fetch_module.UserResponseDeep;
	time_set: Date;
	authToken: string;
}

export interface StoredLeagues {
	leaguesInfo: fetch_module.League[];
	time_set: Date;
}

export default function AuthProvider(props) {
	const [userInfo, setUserInfo] =
		useState<fetch_module.UserResponseDeep | null>(null);
	const [cookies] = useCookies(['auth-token']);
	const authToken: string | undefined = cookies['auth-token'];
	useEffect(() => {
		if (authToken) {
			let stored_user = window.localStorage.getItem('user-cache');
			if (stored_user && stored_user !== 'null') {
				let actual_info: StoredUser = JSON.parse(stored_user);
				// don't make another request if our auth token hasn't changed
				console.log(
					'CacheProvider: StoredUser:',
					'(not sending due to auth token)'
				);
				if (
					authToken === actual_info.authToken ||
					Date.now() - new Date(actual_info.time_set).getTime() <
						24 * 60 * 60 * 1000
				)
					return;
			}
			console.log('CacheProvider: fetching new user info');
			fetch_module
				.fetch_user_from_auth(authToken)
				.then(setUserInfo)
				.catch(console.error);
		} else {
			setUserInfo(null);
		}
	}, [authToken]);

	useEffect(() => {
		if (userInfo) {
			let time_set = new Date(Date.now());
			let serialize = JSON.stringify({ userInfo, time_set, authToken });
			window.localStorage.setItem('user-cache', serialize);
		}
	}, [authToken, userInfo]);

	return <></>;
}
