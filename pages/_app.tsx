import AppWrapper from '@/src/components/AppWrapper';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppWrapper>
			<Component {...pageProps} />
		</AppWrapper>
	);
}
