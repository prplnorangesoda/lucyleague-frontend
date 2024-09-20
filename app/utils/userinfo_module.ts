'use client';
import { StoredUser } from '../components/AuthProvider';
import { User } from './fetch_module';

export function get_user_info(): Promise<StoredUser> {
	let recursive_function = (
		resolve: (user: StoredUser) => void,
		reject: (reason: any) => void,
		depth: number = 0
	) => {
		if (depth >= 5) {
			reject('Depth limit exceeded');
		}
		let user_cache = window.localStorage.getItem('user-cache');
		if (!user_cache || user_cache === 'null') {
			// check again in a second
			setTimeout(recursive_function, 1000, resolve, reject, depth++);
		} else resolve(JSON.parse(user_cache));
	};

	return new Promise(recursive_function);
}
