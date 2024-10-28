import Head from 'next/head';

export interface MetaInfoProps {
	description?: string;
	title?: string;
}
export default function MetaInfo(props: MetaInfoProps) {
	const description =
		props.description || 'A league for 4v4 pass time - coming soon';
	const title = props.title;
	return (
		<Head key="main">
			<meta name="description" content={description} />
			<meta property="og:description" content={description} />
			<meta property="og:title" content={title} />
			<meta name="theme-color" content="#ff773d" />
			<link rel="icon" href="/assets/jotchua.avif" type="image/avif"></link>
			<title key="main">{title ? title + ' | lucyleague' : 'lucyleague'}</title>

			<meta property="og:type" content="website" />
		</Head>
	);
}
