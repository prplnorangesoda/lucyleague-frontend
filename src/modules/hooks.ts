import { useEffect, useState } from 'react';
import {
	DeepTeamDivAssociation,
	User,
	UserResponseDeep,
	useUserAuthTokenDeep,
} from './fetch_module';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

export function useLocalUser(): UserResponseDeep | undefined {
	// if the auth token changes, we want to grab the local user again
	const [cookies] = useCookies(['auth-token']);
	let swr = useUserAuthTokenDeep(cookies['auth-token']);
	return swr.data;
}
