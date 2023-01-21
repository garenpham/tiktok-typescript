import { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';

const style = {
	wrapper: `flex gap-6`,
	container: `mt-4 flex flex-col justify-center items-center cursor-pointer`,
	disLiked__container: `bg-primary rounded-full p-2 md:p-4`,
	liked__icon: `text-lg md:text-2xl`,
	numLikes: `text-md font-semibold`,
};

interface Iprops {
	handleLike: () => void;
	handleDislike: () => void;
	likes: any[];
}

const LikeButton = ({ likes, handleLike, handleDislike }: Iprops) => {
	const [alreadyLiked, setAlreadyLiked] = useState(false);
	const { userProfile }: any = useAuthStore();
	const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);
	useEffect(() => {
		if (filterLikes?.length > 0) {
			setAlreadyLiked(true);
		} else {
			setAlreadyLiked(false);
		}
	}, [filterLikes, likes]);

	return (
		<div className={style.wrapper}>
			<div className={style.container}>
				{alreadyLiked ? (
					<div
						onClick={handleDislike}
						className={[
							style.disLiked__container,
							'text-[#F51997]',
						].join(' ')}
					>
						<MdFavorite className={style.liked__icon} />
					</div>
				) : (
					<div
						onClick={handleLike}
						className={style.disLiked__container}
					>
						<MdFavorite className={style.liked__icon} />
					</div>
				)}
				<p className={style.numLikes}>{likes?.length || 0}</p>
			</div>
		</div>
	);
};
export default LikeButton;
