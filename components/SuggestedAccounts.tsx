import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';

const style = {
	wrapper: `xl:border-b-2 border-gray-200 pb-4`,
	title: `text-gray-500 font-semibold m-3 mt-4 hidden xl:block`,
	users: `flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded`,
	users__imgWrap: `w-8 h-8`,
	users__info: `hidden xl:block`,
	users__name: `flex gap-1 items-center capitalize text-md font-bold text-primary`,
	users__subName: ` lowercase text-gray-400 text-xm`,
};

const SuggestedAccounts = () => {
	const { fetchAllUsers, allUsers } = useAuthStore();
	useEffect(() => {
		fetchAllUsers();
	}, [fetchAllUsers]);

	return (
		<div className={style.wrapper}>
			<p className={style.title}>Suggested Accounts</p>

			<div>
				{allUsers.slice(0, 6).map((user: IUser) => (
					<Link
						href={`/profile/${user._id}`}
						key={user._id}>
						<div className={style.users}>
							<div className={style.users__imgWrap}>
								<Image
									src={user.image}
									width={34}
									height={34}
									className="rounded-full"
									alt="user profile"
									layout="responsive"
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
				))}
			</div>
		</div>
	);
};
export default SuggestedAccounts;
