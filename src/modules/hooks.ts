import { useEffect, useState } from 'react';
import { User, UserResponseDeep } from './fetch_module';
import { useCookies } from 'react-cookie';
import { get_user_info } from './caching_module';

export function useLocalUser(): UserResponseDeep | null {
	// if the auth token changes, we want to grab the local user again
	const [cookies] = useCookies(['auth-token']);
	const [user, setUser] = useState<UserResponseDeep | null>(null);

	let authToken = cookies['auth-token'] as string;
	useEffect(() => {
		console.log('useLocalUser: getting local user');
		get_user_info().then((info) => {
			setUser(info.userInfo);
		});
	}, [authToken]);
	return user;
}
