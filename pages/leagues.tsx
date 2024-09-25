import AppWrapper from '@/app/components/AppWrapper';
import { StoredLeagues } from '@/app/components/CacheProvider';
import { useEffect, useState } from 'react';

export default function AllLeaguesPage() {
	const [leagues, setLeagues] = useState<StoredLeagues | null>(null);

	useEffect(() => {}, [setLeagues]);
	return <AppWrapper></AppWrapper>;
}
