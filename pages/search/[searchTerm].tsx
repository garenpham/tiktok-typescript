import { useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {
	const [isAccounts, setIsAccounts] = useState(false);
	const router = useRouter();
	const { searchTerm }: any = router.query;
	const { allUsers } = useAuthStore();

	const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
	const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
	const searchedAccounts = allUsers.filter((user: IUser) =>
		user.userName.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const style = {
		wrapper: `w-full`,
		menu: `flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full`,
		menu__videos: `text-xl font-semibold cursor-pointer mt-2 ${accounts}`,
		menu__liked: `text-xl font-semibold cursor-pointer mt-2 ${isVideos}`,
		videos__list: `md:mt-16 flex flex-wrap gap-6 md:justify-start`,
		accounts__list: `md:mt-16`,
		users__wrapper: `flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200`,
		users__imgWrap: ``,
		users__info: `hidden xl:block`,
		users__name: `flex gap-1 items-center capitalize text-md font-bold text-primary`,
		users__subName: ` lowercase text-gray-400 text-xm`,
	};

	return (
		<div className={style.wrapper}>
			<div className={style.menu}>
				<p
					className={style.menu__videos}
					onClick={() => setIsAccounts(true)}>
					Accounts
				</p>
				<p
					className={style.menu__liked}
					onClick={() => setIsAccounts(false)}>
					Videos
				</p>
			</div>
			{isAccounts ? (
				<div className={style.accounts__list}>
					{searchedAccounts.length > 0 ? (
						searchedAccounts.map((user: IUser, idx: number) => (
							<Link
								href={`/profile/${user._id}`}
								key={idx}>
								<div className={style.users__wrapper}>
									<div className={style.users__imgWrap}>
										<Image
											src={user.image}
											width={50}
											height={50}
											className="rounded-full"
											alt="user profile"
										/>
									</div>

									<div className={style.users__info}>
										<p className={style.users__name}>
											{user.userName}
											<GoVerified className="text-blue-400" />
										</p>
										<p className={style.users__subName}>
											{user.userName.replace(' ', '')}
										</p>
									</div>
								</div>
							</Link>
						))
					) : (
						<NoResults text={`No results for ${searchTerm}`} />
					)}
				</div>
			) : (
				<div className={style.videos__list}>
					{videos.length ? (
						videos.map((video: Video, idx) => (
							<VideoCard
								post={video}
								key={idx}
							/>
						))
					) : (
						<NoResults
							text={`No video results for ${searchTerm}`}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const getServerSideProps = async ({
	params: { searchTerm },
}: {
	params: { searchTerm: string };
}) => {
	const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

	return {
		props: { videos: res.data },
	};
};

export default Search;
