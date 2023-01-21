import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';

const style = {
	wrapper: `xl:border-b-2 xl:border-gray-200 pb-6`,
	title: `text-gray-500 font-semibold m-3 mt-4 hidden xl:block`,
	topics: `flex gap-3 flex-wrap`,
	icon: `font-bold text-2xl xl:text-md`,
	name: `font-medium text-md hidden xl:block capitalize`,
	activeTopic: `xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#FF1997] active:scale-95 transition transform duration-100 ease-out`,
	topic: `xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black active:scale-95 transition transform duration-100 ease-out`,
};

const Discover = () => {
	const router = useRouter();
	const { topic } = router.query;

	return (
		<div className={style.wrapper}>
			<p className={style.title}>Popular Topics</p>

			<div className={style.topics}>
				{topics.map((item) => (
					<Link
						href={`/?topic=${item.name}`}
						key={item.name}
					>
						<div
							className={
								topic === item.name
									? style.activeTopic
									: style.topic
							}
						>
							<span className={style.icon}>{item.icon}</span>
							<span className={style.name}>{item.name}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};
export default Discover;
