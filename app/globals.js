'use client';

export default {
	API_BASE: process.env.NEXT_PUBLIC_API_BASE,
	/**
	 * Should not be used if there is no port.
	 *
	 * @param {string} str
	 */
	trim_port: (str) => {
		// FEAR
		if (!str.match(/https?:\/\/([0-9a-zA-Z\.]*|\[[0-9a-f:]*\]):[0-9]+/))
			return str;
		let reverse = str.split('').reverse().join('');
		let index = str.length - reverse.indexOf(':') - 1; // to include the : itself
		return str.substring(0, index);
	},
};
