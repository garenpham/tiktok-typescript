import type { NextApiRequest, NextApiResponse } from 'next';

import {
	singleUserQuery,
	userCreatedPostsQuery,
	userLikedPostsQuery,
} from '../../../utils/queries';
import { client } from './../../../utils/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		const { id } = req.query;

		const user = await client.fetch(singleUserQuery(id));
		const userVideos = await client.fetch(userCreatedPostsQuery(id));
		const userLikedVideos = await client.fetch(userLikedPostsQuery(id));

		res.status(200).json({ user: user[0], userVideos, userLikedVideos });
	}
}
