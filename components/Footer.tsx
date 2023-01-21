import { footerList1, footerList2, footerList3 } from '../utils/constants';

const style = {
	wrapper: `mt-6 hidden xl:block`,
	// container: `flex flex-wrap gap-2 first:mt-0 mt-5`,
	item: `text-gray-400 text-sm hover:underline cursor-pointer`,
	patent: `text-gray-400 text-sm mt-5`,
};

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
	<div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
		{items.map((item) => (
			<p
				key={item}
				className={style.item}
			>
				{item}
			</p>
		))}
	</div>
);

const Footer = () => {
	return (
		<div className={style.wrapper}>
			<List
				items={footerList1}
				mt={false}
			/>
			<List
				items={footerList2}
				mt
			/>
			<List
				items={footerList3}
				mt
			/>
			<p className={style.patent}>2022 Tiktok Nextjs</p>
		</div>
	);
};
export default Footer;
