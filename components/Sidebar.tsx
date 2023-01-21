import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { useState } from 'react';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const style = {
	sidebar: `block xl:hidden m-2 ml-4 mt-3 text-xl`,
	container: `xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3`,
	links: `xl:border-b-2 border-gray-200 xl:pb-4`,
	normalLink: `flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded`,
	link__icon: `text-2xl`,
	link__title: `text-xl hidden xl:block`,
	login__container: `px-2 py-4 hidden xl:block`,
	login: `text-gray-400`,
	login__icon: `pr-4`,
	login__btn: `bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer active:scale-95 trasition transform duration-100 ease-out`,
};

const Sidebar = () => {
	const [showSideBar, setShowSideBar] = useState(true);

	return (
		<div>
			<div
				className={style.sidebar}
				onClick={() => setShowSideBar((prev) => !prev)}>
				{showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
			</div>
			{showSideBar && (
				<div className={style.container}>
					<div className={style.links}>
						<Link href="/">
							<div className={style.normalLink}>
								<p className={style.link__icon}>
									<AiFillHome />
								</p>
								<span className={style.link__title}>
									For You
								</span>
							</div>
						</Link>
					</div>

					<Discover />
					<SuggestedAccounts />
					<Footer />
				</div>
			)}
		</div>
	);
};
export default Sidebar;
