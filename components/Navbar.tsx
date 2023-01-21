import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/tiktok.png';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';
import { useState, useEffect } from 'react';

const style = {
	wrapper: `w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4`,
	img__container: `w-[100px] md:w-[130px]`,
	img: `cursor-pointer`,
	user__container: `flex gap-5 md:gap-10`,
	addIcon: `text-xl`,
	upload__btn: `border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2`,
	upload__txt: `hidden md:block`,
	search__container: `relative hidden md:block`,
	search__form: `absolute md:static top-10 -left-20 bg-white`,
	search__input: `bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0`,
	search__button: `absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400`,
};

const Navbar = () => {
	const {
		userProfile,
		addUser,
		removeUser,
	}: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();
	const [searchValue, setSearchValue] = useState('');
	const router = useRouter();

	const handleSearch = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (searchValue) {
			router.push(`/search/${searchValue}`);
		}
	};

	return (
		<div className={style.wrapper}>
			<Link href="/">
				<div className={style.img__container}>
					<Image
						src={Logo}
						alt="tiktok"
						layout="responsive"
						className={style.img}
					/>
				</div>
			</Link>

			<div className={style.search__container}>
				<form
					onSubmit={handleSearch}
					className={style.search__form}>
					<input
						type="text"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search accounts and videos"
						className={style.search__input}
					/>
					<button
						onClick={handleSearch}
						className={style.search__button}>
						<BiSearch />
					</button>
				</form>
			</div>

			<div>
				{userProfile ? (
					<div className={style.user__container}>
						<Link href="/upload">
							<button className={style.upload__btn}>
								<IoMdAdd className={style.addIcon} />{' '}
								<span className={style.upload__txt}>
									Upload
								</span>
							</button>
						</Link>

						{userProfile.image && (
							<Link href="/">
								<>
									<Image
										src={userProfile.image}
										alt="profile photo"
										className={[
											style.img,
											'rounded-full',
										].join(' ')}
										width={40}
										height={40}
									/>
								</>
							</Link>
						)}

						<button
							type="button"
							className="px-2"
							onClick={() => {
								googleLogout();
								removeUser();
							}}>
							<AiOutlineLogout
								color="red"
								fontSize={21}
							/>
						</button>
					</div>
				) : (
					<GoogleLogin
						onSuccess={(response) =>
							createOrGetUser(response, addUser)
						}
						onError={() => {}}
					/>
				)}
			</div>
		</div>
	);
};
export default Navbar;
