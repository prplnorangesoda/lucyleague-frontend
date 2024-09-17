'use client';

import globals from '../globals';

let module = {};

/**
 * Call the API for user info from an auth token.
 * @param {string} token the user's auth token
 * @returns {Promise<any>} API response
 */
module.fetch_info_from_auth = async function (token) {
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
	return authInfo;
};

/**
 * Calls the API for user info from a steamid64.
 * @param {string} s64 the steamid
 * @returns {Promise<any|null>} API response user info. `null` if not found.
 */
module.fetch_info_from_s64 = async function (s64) {
	let userInfo;

	if (typeof s64 !== 'string') {
		throw new Error('Specified s64 was ');
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

module.hot = 'hi';

export default module;
