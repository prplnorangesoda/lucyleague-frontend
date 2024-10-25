'use client';

export function debugLog(...args: any[]) {
	if (globals.DEBUG) console.log(...args);
}

let globals = {
	API_BASE: process.env.NEXT_PUBLIC_API_BASE!,
	DEBUG: process.env.NEXT_PUBLIC_DEBUG! === 'true',
};

Object.freeze(globals);

export default globals;
