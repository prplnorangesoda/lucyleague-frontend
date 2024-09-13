'use client';

export default {
	API_MIDDLE: `:8080/api/v1/`,
	trim_port: (str) => str.substring(0, str.indexOf(':', 7)),
};
