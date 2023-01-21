import { NextPage } from 'next';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';

interface IProps {
	text: string;
}

const style = {
	wrapper: `flex flex-col justify-center items-center h-full w-full`,
	camOff: `text-8xl`,
	text: `text-2xl text-center`,
};

const NoResults: NextPage<IProps> = ({ text }) => {
	return (
		<div className={style.wrapper}>
			<p className={style.camOff}>
				{text === 'Be the first one to add a comment' ? (
					<BiCommentX />
				) : (
					<MdOutlineVideocamOff />
				)}
			</p>
			<p className={style.text}>{text}</p>
		</div>
	);
};
export default NoResults;
