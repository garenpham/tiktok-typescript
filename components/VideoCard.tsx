import { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BASE_URL } from '../utils';

interface IProps {
	post: Video;
	isNotPostDetails?: boolean;
}

const style = {
	wrapper: `flex flex-col border-b-2 border-gray-200 pb-6`,
	container: `flex gap-3 p-2 cursor-pointer font-semibold rounded`,
	content: `md:w-16 md:h-16 w-10 h-10`,
	img: `rounded-full`,
	verified: `text-blue-400 text-md`,
	profile: `flex items-center gap-2`,
	userName: `flex gap-2 items-center md:text-md font-bold text-primary`,
	subUserName: `font-medium text-xs text-gray-500 hidden md:block`,
	video__wrapper: `lg:ml-20 flex gap-4 relative`,
	video__container: `rounded-3xl`,
	video: `lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100`,
	icon: `text-black text-2xl lg:text-4xl`,
	icon__container: `absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:p-3`,
	caption: `mt-2 font-normal`,
};

const VideoCard: NextPage<IProps> = ({ post, isNotPostDetails }) => {
	const [isHover, setIsHover] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);

	const onVideoPress = () => {
		if (playing) {
			videoRef?.current?.pause();
			setPlaying(false);
		} else {
			videoRef?.current?.play();
			setPlaying(true);
		}
	};

	useEffect(() => {
		if (videoRef?.current) {
			videoRef.current.muted = isVideoMuted;
		}
	}, [isVideoMuted]);

	return (
		<div className={style.wrapper}>
			<div>
				<div className={style.container}>
					<div className={style.content}>
						<Link href={`/profile/${post.postedBy._id}`}>
							<>
								<Image
									src={post.postedBy.image}
									alt="profile photo"
									className={style.img}
									width={62}
									height={62}
									layout="responsive"
								/>
							</>
						</Link>
					</div>
					<div>
						<Link href={`/profile/${post.postedBy._id}`}>
							<div className={style.profile}>
								<p className={style.userName}>
									{post.postedBy.userName}{' '}
									<GoVerified className={style.verified} />
								</p>
								<p className={style.subUserName}>{post.postedBy.userName}</p>
							</div>
						</Link>
						<div className={style.caption}>
							{post.caption}
							<br />
							<Link href={`/?topic=${post.topic}`}>
								<div className="text-blue-800">#{post.topic}</div>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className={style.video__wrapper}>
				<div
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					className={style.video__container}>
					<Link href={`/detail/${post._id}`}>
						<video
							loop
							ref={videoRef}
							src={post.video.asset.url}
							className={style.video}></video>
					</Link>

					{isHover && (
						<div className={style.icon__container}>
							{playing ? (
								<button onClick={onVideoPress}>
									<BsFillPauseFill className={style.icon} />
								</button>
							) : (
								<button onClick={onVideoPress}>
									<BsFillPlayFill className={style.icon} />
								</button>
							)}
							{isVideoMuted ? (
								<button onClick={() => setIsVideoMuted(false)}>
									<HiVolumeOff className={style.icon} />
								</button>
							) : (
								<button onClick={() => setIsVideoMuted(true)}>
									<HiVolumeUp className={style.icon} />
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default VideoCard;
