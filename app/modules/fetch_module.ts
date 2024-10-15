'use client';

import globals from '../globals';
import useSWR from 'swr';
type i64 = number;
type String = string;
export interface User {
	id: number;
	permissions: number;
	avatarurl: string;
	steamid: string;
	username: string;
	created_at: string;
}
let cached_user: User | undefined;

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useUserS64(steamid: number | string) {
	const { data, error, isLoading } = useSWR(
		globals.API_BASE + 'user/steamid/' + steamid,
		fetcher
	);

	return {
		user: data as User,
		isLoading,
		isError: error,
	};
}

export function useUserAuthToken(authtoken: string) {
	const { data, error, isLoading } = useSWR(
		globals.API_BASE + 'user/authtoken/' + authtoken,
		fetcher
	);

	return {
		user: data as User,
		isLoading,
		isError: error,
	};
}

// export let fetch_user_from_auth = async function (
// 	token: string
// ): Promise<User> {
// 	if (cached_user) return cached_user;
// 	let authInfo: User;

// 	// we are running on the client side - hostname unnecessary
// 	const url = globals.API_BASE + 'user/authtoken/';
// 	if (!token) {
// 		throw new Error('No token specified to fetch info for');
// 	}

// 	let resp = await fetch(url + token);
// 	if (resp.status == 404) {
// 		throw new Error('User not found');
// 	}
// 	try {
// 		authInfo = await resp.json();
// 	} catch (err) {
// 		throw new Error('API response malformed: ' + err);
// 	}
// 	cached_user = authInfo;
// 	return authInfo;
// };

// /**
//  * Calls the API for user info from a steamid64.
//  */
// export let fetch_info_from_s64 = async function (
// 	s64: string
// ): Promise<User | null> {
// 	let userInfo: User;

// 	const url = globals.API_BASE + 'user/steamid/';
// 	const query = url + s64;

// 	let resp = await fetch(query);

// 	if (resp.status == 404) {
// 		return null;
// 	}
// 	try {
// 		userInfo = await resp.json();
// 	} catch (err) {
// 		throw new Error('API response malformed: ' + err);
// 	}

// 	return userInfo;
// };

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

export interface Division {
	id: i64;
	leagueid: i64;
	name: String;
	created_at: string;
}

export interface DivisionAdmin {
	id: i64;
	divisionid: i64;
	userid: i64;
	relation: String;
}

export interface WrappedDivisionAdmin {
	inner: DivisionAdmin;
	username: String;
	avatarurl: String;
}

export interface Team {
	id: i64;
	leagueid: i64;
	team_name: String;
	created_at: string;
}
export interface TeamDivAssociation {
	id: i64;
	roster_name: String | undefined;
	teamid: i64;
	divisionid: i64;
	points_up: i64;
	points_down: i64;
	created_at: String;
}

export interface DeepTeamDivAssociation {
	team_info: Team;
	association_info: TeamDivAssociation;
}
export interface DivisionOptionalTeams {
	info: Division;
	admins: WrappedDivisionAdmin[];
	teams: DeepTeamDivAssociation[] | undefined;
}
export interface League {
	id: number;
	name: string;
	accepting_teams: boolean;
	created_at: Date;
	is_hidden: boolean;
}
export interface LeagueReturn {
	info: League;
	divisions: DivisionOptionalTeams[];
}

export async function logout(auth_token: string): Promise<boolean> {
	const url = globals.API_BASE + 'logout';
	let result = (
		await fetch(url, {
			method: 'POST',
			headers: {
				['Content-Type']: 'application/json',
			},
			body: JSON.stringify({ auth_token }),
		})
	).status;
	return result === 200 || result === 400;
}

export async function fetch_leagues(): Promise<LeagueReturn[] | null> {
	const url = globals.API_BASE + 'leagues';

	let resp = await fetch(url);

	let leagues: LeagueReturn[];

	if (resp.status != 200) {
		return null;
	}
	try {
		leagues = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}
	return leagues;
}

export async function fetch_league(id: number): Promise<LeagueReturn | null> {
	const url = `${globals.API_BASE}leagues/${id}`;

	let resp = await fetch(url);

	let league: LeagueReturn;

	if (resp.status != 200) {
		return null;
	}
	try {
		league = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}
	return league;
}
