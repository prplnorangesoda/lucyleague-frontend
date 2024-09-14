'use client'

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import globals from '../globals';

export function FetchInfoFromAuth() {
    const [cookies] = useCookies(['auth-token']);
	const authToken = cookies['auth-token'];
	const [AuthInfo, setAuthInfo] = useState(null);

	useEffect(() => {
		// we are running on the client side - hostname unnecessary
		const url = globals.trim_port(window.location.origin) + globals.API_MIDDLE + 'user/authtoken/';
		if (authToken) {
			fetch(url + authToken)
				.then((res) => res.json())
				.then((data) => {
					setAuthInfo(data);
				})
		}
	}, []);
	
    return AuthInfo
}