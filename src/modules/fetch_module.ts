'use client';

import globals from '../../src/globals';
import useSWR, { SWRResponse } from 'swr';
type i64 = number;
type String = string;

export type UserResponseDeep = UserResponseBase & UserResponseDeepComponents;
export interface UserResponseBase {
	info: User;
}
export interface UserResponseDeepComponents {
	ownerships: Team[];
	rosters: SuperDeepTeamDivAssociation[];
}
export interface User {
	id: number;
	permissions: number;
	avatarurl: string;
	steamid: string;
	username: string;
	created_at: string;
}
export interface Team {
	id: i64;
	owner_id: String;
	team_name: String;
	team_tag: String;
	created_at: string;
}
export interface TeamResponse {
	info: Team;
	owner: User;
	team_div_assocs: TeamDivAssociation[];
}
export interface TeamDivAssociation {
	id: i64;
	roster_name: String | undefined;
	teamid: i64;
	divisionid: i64;
	points_up: i64;
	points_down: i64;
	is_private: boolean;
	created_at: String;
}

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useBaseTeam(id: string) {
	const ret = useSWR<TeamResponse>(globals.API_BASE + 'teams/' + id, fetcher);

	return ret;
}

export function useUserS64(steamid: number | string) {
	const ret = useSWR<UserResponseBase>(
		globals.API_BASE + 'user/steamid/' + steamid,
		fetcher
	);

	return ret;
}

export function useUserS64Deep(steamid: number | string) {
	const ret = useSWR<UserResponseDeep>(
		globals.API_BASE + 'user/steamid/' + steamid + '?deep=true',
		fetcher
	);

	return ret;
}

export function useUserAuthToken(authtoken: string) {
	const ret = useSWR<UserResponseBase>(
		globals.API_BASE + 'user/authtoken/' + authtoken,
		fetcher
	);

	return ret;
}

export function useUserAuthTokenDeep(authtoken: string) {
	const ret = useSWR<UserResponseDeep>(
		globals.API_BASE + 'user/authtoken/' + authtoken + '?deep=true',
		fetcher
	);

	return ret;
}

let cached_user: UserResponseDeep | undefined;
/**
 *
 * @param token User authentication token
 * @deprecated
 * @returns
 */
export let fetch_user_from_auth = async function (
	token: string
): Promise<UserResponseDeep> {
	if (cached_user) return cached_user;
	let authInfo: UserResponseDeep;

	if (!token) {
		throw new Error('No token specified to fetch info for');
	}

	// we are running on the client side - hostname unnecessary
	const url = globals.API_BASE + 'user/authtoken/' + token + '?deep=true';

	let resp = await fetch(url);
	if (resp.status == 404) {
		throw new Error('User not found');
	}
	try {
		authInfo = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}
	cached_user = authInfo;
	return authInfo;
};

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

export interface UserTeam {
	id: i64;
	teamdivid: i64;
	userid: i64;
	created_at: string;
	ended_at?: string;
	affiliation: i64;
}
export interface SuperDeepTeamDivAssociation {
	user: UserTeam;
	team: DeepTeamDivAssociationNoPlayers;
}
export interface DeepTeamDivAssociationNoPlayers {
	team_info: Team;
	association_info: TeamDivAssociation;
}

export interface UserAndAssoc {
	user: User;
	assoc: UserTeam;
}
export interface DeepTeamDivAssociation {
	team_info: Team;
	association_info: TeamDivAssociation;
	current_players: UserAndAssoc[];
	past_players: UserAndAssoc[];
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

export function useLeagueId(id: number | string): SWRResponse<LeagueReturn> {
	id = parseInt(id.toString());
	if (Object.is(id, NaN)) {
		throw new Error('Invalid id passed to useLeagueId');
	}

	if (id === -1) {
		throw new Error('Invalid id');
	}
	const ret = useSWR<LeagueReturn, any>(
		globals.API_BASE + 'leagues/' + id,
		fetcher
	);

	return ret;
}

export function useTeamDivAssocId(
	id: number | string
): SWRResponse<DeepTeamDivAssociation> {
	id = parseInt(id.toString());
	if (Object.is(id, NaN)) {
		throw new Error('Invalid id passed to useLeagueId');
	}

	if (id === -1) {
		throw new Error('Invalid id');
	}
	const ret = useSWR<DeepTeamDivAssociation, any>(
		globals.API_BASE + 'teamdivassocs/' + id,
		fetcher
	);

	return ret;
}
/**
 *
 * @param id League id
 * @deprecated
 * @returns
 */
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
