import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

const style = {
	wrapper: `border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]`,
	container: `overflow-scroll lg:h-[475px]`,
	comment__wrapper: `absolute bottom-0 left-0 pb-6 px-2 md:px-10`,
	comment__form: `flex gap-4`,
	comment__input: `bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg`,
	comment__postIcon: `text-md text-gray-400`,
	users__wrapper: `flex items-start gap-3`,
	users__comment: `p-2 items-center`,
	users__imgWrap: `w-8 h-8`,
	users__info: `hidden xl:block`,
	users__name: `flex gap-1 items-center capitalize text-md font-bold text-primary`,
	users__subName: ` lowercase text-gray-400 text-xm`,
};

interface IProps {
	isPostingComment: Boolean;
	comment: string;
	setComment: Dispatch<SetStateAction<string>>;
	addComment: (e: React.FormEvent) => void;
	comments: IComment[];
}

interface IComment {
	comment: string;
	length?: number;
	_key: string;
	postedBy: { _ref: string; _id: string };
}

const Comments = ({
	comment,
	setComment,
	addComment,
	comments,
	isPostingComment,
}: IProps) => {
	const { userProfile, allUsers } = useAuthStore();
	return (
		<div className={style.wrapper}>
			<div className={style.container}>
				{comments?.length ? (
					comments.map((item, idx) => (
						<>
							{allUsers.map(
								(user: IUser) =>
									user._id ===
										(item.postedBy._id ||
											item.postedBy._ref) && (
										<div
											className={style.users__comment}
											key={idx}>
											<Link href={`/profile/${user._id}`}>
												<div
													className={
														style.users__wrapper
													}>
													<div
														className={
															style.users__imgWrap
														}>
														<Image
															src={user.image}
															width={34}
															height={34}
															className="rounded-full"
															alt="user profile"
															layout="responsive"
														/>
													</div>

													<div
														className={
															style.users__info
														}>
														<p
															className={
																style.users__name
															}>
															{user.userName}
															<GoVerified className="text-blue-400" />
														</p>
														<p
															className={
																style.users__subName
															}>
															{user.userName.replace(
																' ',
																'',
															)}
														</p>
													</div>
												</div>
											</Link>
											<div>
												<p>{item.comment}</p>
											</div>
										</div>
									),
							)}
						</>
					))
				) : (
					<NoResults text="Be the first one to add a comment" />
				)}
			</div>

			{userProfile && (
				<div className={style.comment__wrapper}>
					<form
						onSubmit={addComment}
						className={style.comment__form}>
						<input
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Add comment..."
							className={style.comment__input}
						/>
						<button
							onClick={addComment}
							className={style.comment__postIcon}>
							{isPostingComment ? 'Commenting...' : 'Comment'}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};
export default Comments;
