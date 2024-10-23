import AppWrapper from '@/app/components/AppWrapper';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppWrapper>
			<Component {...pageProps} />
		</AppWrapper>
	);
}
