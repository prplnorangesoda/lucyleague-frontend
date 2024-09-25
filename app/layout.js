import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'league.passtime.tf',
	description: 'a league for 4v4 passtime',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body style={{ height: '100vh' }} className={inter.className}>
				{children}
			</body>
		</html>
	);
}
