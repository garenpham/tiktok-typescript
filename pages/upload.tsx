import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';

import { topics } from '../utils/constants';
import { BASE_URL } from '../utils';

const style = {
	wrapper: `flex w-full h-full absolute left-0 top-5 mb-10 mt-10 pt-10 lg:pt-15 bg-[#f8f8f8] justify-center`,
	container: `bg-white rounded-lg xl:h-[84vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6`,
	title: `text-2xl font-bold`,
	subTitle: `text-md text-gray-400 mt-1`,
	upload__wrapper: `border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[20vw] h-[60vh] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 active:scale-95 transition transform duration-100`,
	upload: `cursor-pointer`,
	upload__container: `flex flex-col items-center justify-center`,
	upload__btnContainer: `font-bold text-xl`,
	upload__btn: `text-gray-300 text-6xl`,
	upload__txt: `text-xl font-semibold`,
	upload__requirements: `text-gray-400 text-center mt-10 text-sm leading-10`,
	upload__select: `bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-40 lg:w-52 outline-none`,
	upload__inputVid: `w-0 h-0`,
	upload__video: `rounded-xl h-[450px] mt-16 bg-black`,
	upload__error: `text-center text-xl text-red-400 font-semibold mt-4 w-[250px]`,
	form__wrapper: `flex flex-col gap-3 pb-10`,
	form__label: `text-md font-medium`,
	form__input: `rounded outline-none text-md border-2 border-gray-200 p-2`,
	topics: `outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300`,
	topics__container: `outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer`,
	confirmation: `flex gap-6 mt-10`,
	confirmation__discard: `border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none active:scale-95 transition transform duration-100`,
	confirmation__post: `bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none active:scale-95 transition transform duration-100`,
};

const Upload = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [videoAsset, setVideoAsset] = useState<
		SanityAssetDocument | undefined
	>();
	const [wrongFileType, setWrongFileType] = useState(false);
	const [caption, setCaption] = useState('');
	const [category, setCategory] = useState(topics[0].name);
	const [savingPost, setSavingPost] = useState(false);
	const { userProfile }: { userProfile: any } = useAuthStore();
	const router = useRouter();

	const uploadVideo = async (e: any) => {
		const selectedFile = e.target.files[0];
		const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

		if (fileTypes.includes(selectedFile.type)) {
			client.assets
				.upload('file', selectedFile, {
					contentType: selectedFile.type,
					filename: selectedFile.name,
				})
				.then((data) => {
					setVideoAsset(data);
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
			setWrongFileType(true);
		}
	};

	const handlePost = async () => {
		if (caption && videoAsset?._id && category) {
			setSavingPost(true);

			const document = {
				_type: 'post',
				caption,
				video: {
					_type: 'file',
					asset: {
						_type: 'reference',
						_ref: videoAsset._id,
					},
				},
				userId: userProfile?._id,
				postedBy: {
					_type: 'postedBy',
					_ref: userProfile?._id,
				},
				topic: category,
			};

			await axios.post(`${BASE_URL}/api/post`, document);
			router.push('/');
		}
	};

	return (
		<div className={style.wrapper}>
			<div className={style.container}>
				<div>
					<div>
						<p className={style.title}>Upload Video</p>
						<p className={style.subTitle}>
							Post a video to your account
						</p>
					</div>
					<div className={style.upload__wrapper}>
						{isLoading ? (
							<p>Uploading...</p>
						) : (
							<div>
								{videoAsset ? (
									<div>
										<video
											src={videoAsset.url}
											loop
											controls
											className={style.upload__video}
										></video>
									</div>
								) : (
									<label className={style.upload}>
										<div
											className={[
												style.upload__container,
												'h-full',
											].join(' ')}
										>
											<div
												className={
													style.upload__container
												}
											>
												<p
													className={
														style.upload__btnContainer
													}
												>
													<FaCloudUploadAlt
														className={
															style.upload__btn
														}
													/>
												</p>
												<p
													className={
														style.upload__txt
													}
												>
													Upload video
												</p>
											</div>
											<p
												className={
													style.upload__requirements
												}
											>
												MP4 or WebM or ogg <br />
												720x1280 or higher <br />
												Up to 10 minutes <br />
												Less than 2GB
											</p>
											<p className={style.upload__select}>
												Select File
											</p>
										</div>
										<input
											type="file"
											name="upload-video"
											className={style.upload__inputVid}
											onChange={uploadVideo}
										/>
									</label>
								)}
							</div>
						)}

						{wrongFileType && (
							<p className={style.upload__error}>
								Please select a video file
							</p>
						)}
					</div>
				</div>
				<div className={style.form__wrapper}>
					<label className={style.form__label}>Caption</label>
					<input
						type="text"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						className={style.form__input}
					/>
					<label className={style.form__label}>
						Choose a category
					</label>
					<select
						onChange={(e) => setCategory(e.target.value)}
						className={style.topics__container}
					>
						{topics.map((topic) => (
							<option
								key={topic.name}
								className={style.topics}
								value={topic.name}
							>
								{topic.name}
							</option>
						))}
					</select>
					<div className={style.confirmation}>
						<button
							onClick={() => {}}
							type="button"
							className={style.confirmation__discard}
						>
							Discard
						</button>
						<button
							onClick={handlePost}
							type="button"
							className={style.confirmation__post}
						>
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Upload;
