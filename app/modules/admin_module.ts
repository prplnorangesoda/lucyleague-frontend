import globals from '../globals';
import { League, Division } from './fetch_module';

interface MiniLeague {
	name: string;
	accepting_teams: boolean;
	is_hidden: boolean;
}

export async function add_new_league(
	info: MiniLeague,
	authorization: string
): Promise<League | null> {
	let url = globals.API_BASE + 'admin/leagues';

	let resp = await fetch(url, {
		method: 'POST',
		headers: {
			['Authorization']: `Bearer ${authorization}`,
			['Content-Type']: 'application/json',
		},
		body: JSON.stringify(info),
	});
	if (resp.status != 201) {
		return null;
	}
	let new_league: League;

	try {
		new_league = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}
	return new_league;
}

interface MiniDivision {
	leagueid: number;
	name: string;
}

export async function add_new_division(
	info: MiniDivision,
	authorization: string
): Promise<Division | null> {
	let url = globals.API_BASE + 'admin/divisions';

	let resp = await fetch(url, {
		method: 'POST',
		headers: {
			['Authorization']: `Bearer ${authorization}`,
			['Content-Type']: 'application/json',
		},
		body: JSON.stringify(info),
	});
	if (resp.status != 201) {
		return null;
	}
	let new_div: Division;

	try {
		new_div = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}
	return new_div;
}

interface UserTeam {

}
interface MiniTeam {
	leagueid: number,
	privacy: string, 
	team_name: string,
	team_tag: string,
}
export async function add_new_team(
	info: MiniTeam,
	authorization: string
): Promise<UserTeam | null> {
	let url = globals.API_BASE + 'teams';

	let resp = await fetch(url, {
		method: 'POST',
		headers: {
			['Authorization']: `Bearer ${authorization}`,
			['Content-Type']: 'application/json',
		},
		body: JSON.stringify(info),
	});
	if (resp.status != 201) {
		return null;
	}
	let new_assoc: UserTeam;

	try {
		new_assoc = await resp.json();
	} catch (err) {
		throw new Error('API response malformed: ' + err);
	}
	return new_assoc;
}