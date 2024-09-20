import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import fetch_module, { User } from '../utils/fetch_module';

export default function AuthProvider(props) {
	const [userInfo, setUserInfo]: [User | null, any] = useState(null);
	const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
	const authToken = cookies['auth-token'];
	useEffect(() => {
		if (authToken) {
			fetch_module
				.fetch_user_from_auth(authToken)
				.then(setUserInfo)
				.catch(console.error);
		} else {
			window.localStorage.setItem('user-cache', '');
		}
	}, [authToken]);

	useEffect(() => {
		let time_set = Date.now();
		let serialize = JSON.stringify({ userInfo, time_set });
		window.localStorage.setItem('user-cache', serialize);
	}, [userInfo]);

	return <></>;
}
