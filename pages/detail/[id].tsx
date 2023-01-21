import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

// interface IProps {
// 	postDetails: Video;
// }

const style = {
	wrapper: `flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap`,
	videoSection: `relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-pink-400`,
	cancel: `absolute top-6 left-2 lg:left-6 flex gap-6 z-50`,
	cancel__icon: `text-white text-[35px]`,
	cancel__btn: `cursor-pointer`,
	video__wrapper: `relative`,
	video__container: `lg:h-[100vh] h-[60vh]`,
	video: `h-full cursor-pointer`,
	video__playIcon: `text-white text-6xl lg:text-8xl active:scale-75 transform transition duration-200`,
	video__playBtn: `absolute top-[45%] left-[45%] curosr-pointer`,
	video__muted: `absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer`,
	video__mutedIcon: `text-white text-2xl lg:text-4xl active:scale-75 transform transition duration-200 ease-out`,
	commentSection: `relative w-[1000px] md:w-[900px] lg:w-[700px]`,
	comment__wrapper: `lg:mt-20 mt-10`,
	comment__container: `flex gap-3 p-2 cursor-pointer font-semibold rounded`,
	comment__content: `ml-4 md:w-20 md:h-20 w-16 h-16`,
	comment__img: `rounded-full`,
	comment__verified: `text-blue-400 text-md`,
	comment__profile: `mt-3 flex flex-col gap-2`,
	comment__userName: `flex gap-2 items-center md:text-md font-bold text-primary`,
	comment__subUserName: `font-medium text-xs text-gray-500 hidden md:block`,
	comment__caption: `px-10 text-lg text-gray-600`,
	likes__container: `mt-4 px-10`,
};

const Detail = ({ postDetails }: { postDetails: Video }) => {
	const [post, setPost] = useState(postDetails);
	const [playing, setPlaying] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const router = useRouter();
	const { userProfile }: any = useAuthStore();
	const [comment, setComment] = useState('');
	const [isPostingComment, setIsPostingComment] = useState(false);

	const onVideoClick = () => {
		if (playing) {
			videoRef?.current?.pause();
			setPlaying(false);
		} else {
			videoRef?.current?.play();
			setPlaying(true);
		}
	};

	useEffect(() => {
		if (post && videoRef?.current) {
			videoRef.current.muted = isVideoMuted;
		}
	}, [post, isVideoMuted]);

	const handleLike = async (like: boolean) => {
		if (userProfile) {
			const { data } = await axios.put(`${BASE_URL}/api/like`, {
				userId: userProfile._id,
				postId: post._id,
				like,
			});
			setPost({ ...post, likes: data.likes });
		}
	};

	const addComment = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (userProfile && comment) {
			setIsPostingComment(true);
			const { data } = await axios.put(
				`${BASE_URL}/api/post/${post._id}`,
				{ userId: userProfile._id, comment },
			);
			setPost({ ...post, comments: data.comments });
			setComment('');
			setIsPostingComment(false);
		}
	};

	if (!post) return null;

	return (
		<div className={style.wrapper}>
			<div className={style.videoSection}>
				<div className={style.cancel}>
					<p
						className={style.cancel__btn}
						onClick={() => router.back()}>
						<MdOutlineCancel className={style.cancel__icon} />
					</p>
				</div>
				<div className={style.video__wrapper}>
					<div className={style.video__container}>
						<video
							ref={videoRef}
							loop
							onClick={onVideoClick}
							src={post.video.asset.url}
							className={style.video}></video>
					</div>

					<div className={style.video__playBtn}>
						{!playing && (
							<button onClick={onVideoClick}>
								<BsFillPlayFill
									className={style.video__playIcon}
								/>
							</button>
						)}
					</div>
				</div>

				<div className={style.video__muted}>
					{isVideoMuted ? (
						<button onClick={() => setIsVideoMuted(false)}>
							<HiVolumeOff className={style.video__mutedIcon} />
						</button>
					) : (
						<button onClick={() => setIsVideoMuted(true)}>
							<HiVolumeUp className={style.video__mutedIcon} />
						</button>
					)}
				</div>
			</div>

			<div className={style.commentSection}>
				<div className={style.comment__wrapper}>
					{' '}
					<div className={style.comment__container}>
						<div className={style.comment__content}>
							<Link href="/">
								<>
									<Image
										src={post.postedBy.image}
										alt="profile photo"
										className={style.comment__img}
										width={62}
										height={62}
										layout="responsive"
									/>
								</>
							</Link>
						</div>
						<div>
							<Link href="/">
								<div className={style.comment__profile}>
									<p className={style.comment__userName}>
										{post.postedBy.userName}{' '}
										<GoVerified
											className={style.comment__verified}
										/>
									</p>
									<p className={style.comment__subUserName}>
										{post.postedBy.userName}
									</p>
								</div>
							</Link>
						</div>
					</div>
					<p className={style.comment__caption}>{post.caption}</p>
					<div className={style.likes__container}>
						{userProfile && (
							<LikeButton
								likes={post.likes}
								handleLike={() => handleLike(true)}
								handleDislike={() => handleLike(false)}
							/>
						)}
					</div>
					<Comments
						comment={comment}
						setComment={setComment}
						addComment={addComment}
						comments={post.comments}
						isPostingComment={isPostingComment}
					/>
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
	const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

	return {
		props: { postDetails: data },
	};
};
export default Detail;
