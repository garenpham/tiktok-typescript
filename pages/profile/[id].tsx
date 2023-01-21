import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
	data: {
		user: IUser;
		userVideos: Video[];
		userLikedVideos: Video[];
	};
}

const Profile = ({ data }: IProps) => {
	const [showUserVideos, setShowUserVideos] = useState(true);
	const [videosList, setVideosList] = useState<Video[]>([]);
	const { user, userVideos, userLikedVideos } = data;

	const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
	const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

	const style = {
		wrapper: `w-full`,
		container: `flex gap-6 md:gap-10 mb-4 bg-white w-full`,
		user__imgWrap: `w-16 h-16 md:w-32 md:h-32`,
		user__info: `flex flex-col justify-center`,
		user__name: `md:text-2xl tracking-wider flex gap-1 items-center justify-center capitalize text-md font-bold text-primary`,
		user__subName: ` lowercase text-gray-400 text-xm md:text-xl`,
		menu: `flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full`,
		menu__videos: `text-xl font-semibold cursor-pointer mt-2 ${videos}`,
		menu__liked: `text-xl font-semibold cursor-pointer mt-2 ${liked}`,
		videos__container: `flex gap-6 flex-wrap md:justify-start`,
	};

	useEffect(() => {
		if (showUserVideos) {
			setVideosList(userVideos);
		} else {
			setVideosList(userLikedVideos);
		}
	}, [showUserVideos, userVideos, userLikedVideos]);

	return (
		<div className={style.wrapper}>
			<div className={style.container}>
				<div className={style.user__imgWrap}>
					<Image
						src={user.image}
						width={120}
						height={120}
						className="rounded-full"
						alt="user profile"
						layout="responsive"
					/>
				</div>

				<div className={style.user__info}>
					<p className={style.user__name}>
						{user.userName}
						<GoVerified className="text-blue-400" />
					</p>
					<p className={style.user__subName}>
						{user.userName.replace(' ', '')}
					</p>
				</div>
			</div>

			<div>
				<div className={style.menu}>
					<p
						className={style.menu__videos}
						onClick={() => setShowUserVideos(true)}>
						Videos
					</p>
					<p
						className={style.menu__liked}
						onClick={() => setShowUserVideos(false)}>
						Liked
					</p>
				</div>

				<div className={style.videos__container}>
					{videosList.length > 0 ? (
						videosList.map((post: Video, idx: number) => (
							<VideoCard
								post={post}
								key={idx}
							/>
						))
					) : (
						<NoResults
							text={`No ${
								showUserVideos ? '' : 'Liked'
							} Videos yet`}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

	return {
		props: { data: res.data },
	};
};

export default Profile;
