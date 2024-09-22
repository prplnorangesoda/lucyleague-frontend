'use client';

import globals from '../globals';

export interface User {
	id: number;
	permissions: number;
	avatarurl: string;
	steamid: string;
	username: string;
	created_at: string;
}
let cached_state;

export let fetch_user_from_auth = async function (
	token: string
): Promise<User> {
	if (cached_state) return cached_state;
	let authInfo;

	// we are running on the client side - hostname unnecessary
	const url = globals.API_BASE + 'user/authtoken/';
	if (!token) {
		throw new Error('No token specified to fetch info for');
	}

	let resp = await fetch(url + token);
	try {
		authInfo = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}
	cached_state = authInfo;
	return authInfo;
};

/**
 * Calls the API for user info from a steamid64.
 * @param {string} s64 the steamid
 * @returns {Promise<any|null>} API response user info. `null` if not found.
 */
export let fetch_info_from_s64 = async function (s64) {
	let userInfo;

	if (typeof s64 !== 'string') {
		try {
			//@ts-ignore
			s64 = s64.toString();
		} catch (err) {
			throw new Error('Specified s64 was invalid');
		}
	}

	const url = globals.API_BASE + 'user/steamid/';
	const query = url + s64;

	let resp = await fetch(query);

	if (resp.status == 404) {
		return null;
	}
	try {
		userInfo = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}

	return userInfo;
};

interface PagedUserResponse {
	total_count: number;
	page: number;
	amount_per_page: number;
	users: User[];
}

export async function fetch_users_paged(
	page?: number,
	amount_per_page?: number
): Promise<PagedUserResponse | null> {
	let real_page = page || 0;
	let real_amount = amount_per_page || 10;

	const url = globals.API_BASE + 'users';
	const query = url + `?page=${real_page}&amount_per_page=${real_amount}`;

	let resp = await fetch(query);

	let details: PagedUserResponse;
	if (resp.status != 200) {
		return null;
	}
	try {
		details = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}

	return details;
}
