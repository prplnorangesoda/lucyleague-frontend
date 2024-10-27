import AppWrapper from '@/src/components/AppWrapper';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';

export default function MyApp(props: AppProps) {
	return (
		<AppCacheProvider {...props}>
			<AppWrapper>
				<props.Component {...props.pageProps} />
			</AppWrapper>
		</AppCacheProvider>
	);
}
