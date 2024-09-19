'use client';

import globals from '../globals';

let this_module = {};

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {number} permissions
 * @property {string} avatarurl
 * @property {string} steamid
 * @property {string} username
 * @property {string} created_at - RAW date return!
 */
let cached_state;
/**
 * Call the API for user info from an auth token.
 * @param {string} token the user's auth token
 * @returns {Promise<User>} API response
 */
this_module.fetch_user_from_auth = async function (token) {
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
this_module.fetch_info_from_s64 = async function (s64) {
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

this_module.hot = 'hi';

export default this_module;
