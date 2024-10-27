import {
	DocumentHeadTags,
	documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter';
// or `v1X-pagesRouter` if you are using Next.js v1X

import { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument(props) {
	return (
		<Html lang="en">
			<Head>
				<DocumentHeadTags {...props} />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

MyDocument.getInitialProps = async (ctx) => {
	const finalProps = await documentGetInitialProps(ctx);
	return finalProps;
};
