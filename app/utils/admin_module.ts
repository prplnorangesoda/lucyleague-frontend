import globals from '../globals';
import { League } from './fetch_module';

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
