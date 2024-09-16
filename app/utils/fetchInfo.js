'use client'

import globals from '../globals';

export function FetchInfoFromAuth(token, callback) {
	var AuthInfo

	// we are running on the client side - hostname unnecessary
	const url = globals.trim_port(window.location.origin) + globals.API_MIDDLE + 'user/authtoken/';
	if (token) {
		fetch(url + token)
			.then((res) => res.json())
			.then((data) => {
				AuthInfo = data;

				// run the callback
				if (callback) { 
					if ( typeof callback !== "function" ) {
						console.warn("Callback is not a function!")
					} else {
						callback(data)
					}
				}
			})
	}
	
    return AuthInfo
}

export function FetchUserInfoFromS64( s64, callback, error_callback ) {
	var UserInfo

	if (!s64) {
		return
	}

	const url =
		globals.trim_port(window.location.origin) +
		globals.API_MIDDLE +
		'user/steamid/';
	const query = url + s64;
	
	fetch(query)
		.then((res) => res.json())
		.then((data) => {
			UserInfo = data;
			
			if (callback) { 
				if ( typeof callback !== "function" ) {
					console.warn("Callback is not a function!")
				} else {
					callback(data)
				}
			}
		})
		.catch((err) => {
			console.log(err.message);
			if (error_callback) { 
				if ( typeof error_callback !== "function" ) {
					console.warn("Callback is not a function!")
				} else {
					error_callback(err)
				}
			}
		});	

	return UserInfo
}