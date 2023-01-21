import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Sidebar from './../components/Sidebar';
import Navbar from './../components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const style = {
	wrapper: `xl:w-[1200px] m-auto overflow-hidden h-[100xh]`,
	container: `flex gap-6 md:gap-20`,
	sidebar: `h-[92vh] hover:overflow-auto`,
	page: `mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1`,
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [isSSR, setIsSSR] = useState(true);

	useEffect(() => {
		setIsSSR(false);
	}, []);

	if (isSSR) return null;

	return (
		<GoogleOAuthProvider
			clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
			<div className={style.wrapper}>
				<Navbar />
				<div className={style.container}>
					<div className={style.sidebar}>
						<Sidebar />
					</div>
					<div className={style.page}>
						<Component {...pageProps} />
					</div>
				</div>
			</div>
		</GoogleOAuthProvider>
	);
};

export default MyApp;
