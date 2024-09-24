'use client';
import { StoredUser } from '../components/CacheProvider';
import { User } from './fetch_module';

export function get_user_info(): Promise<StoredUser> {
	let recursive_function = (
		resolve: (user: StoredUser) => void,
		reject: (reason: any) => void,
		depth: number = 0
	) => {
		if (depth >= 5) {
			reject('Depth limit exceeded');
			return;
		}
		let user_cache = window.localStorage.getItem('user-cache');
		if (!user_cache || user_cache === 'null') {
			console.log('No cache found, delaying by 2000ms', depth++);
			// check again in a second
			setTimeout(recursive_function, 2000, resolve, reject, depth++);
		} else resolve(JSON.parse(user_cache));
	};

	return new Promise(recursive_function);
}

export function get_leagues(): Promise<StoredLeagues> {}
