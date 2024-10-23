'use client';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import * as fetch_module from '../utils/fetch_module';

export interface StoredUser {
	userInfo: fetch_module.User;
	time_set: Date;
	authToken: string;
}

export default function AuthProvider(props) {
	const [userInfo, setUserInfo] = useState<fetch_module.User | null>(null);
	const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
	const authToken: string | undefined = cookies['auth-token'];
	useEffect(() => {
		if (authToken) {
			let stored_user = window.localStorage.getItem('user-cache');
			if (stored_user && stored_user !== 'null') {
				let actual_info: StoredUser = JSON.parse(stored_user);
				// don't make another request if our auth token hasn't changed
				if (authToken === actual_info.authToken) return;
			}
			fetch_module
				.fetch_user_from_auth(authToken)
				.then(setUserInfo)
				.catch(console.error);
		} else {
			window.localStorage.setItem('user-cache', 'null');
		}
	}, [authToken]);

	useEffect(() => {
		if (userInfo) {
			let time_set = Date.now();
			let serialize = JSON.stringify({ userInfo, time_set, authToken });
			window.localStorage.setItem('user-cache', serialize);
		}
	}, [userInfo]);

	return <></>;
}
