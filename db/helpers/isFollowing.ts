import { currentUser } from "@clerk/nextjs";
import followModel from "../models/follow.model";
import { connectdb } from "../connect";

export async function isFollowing(followUsername: string) {
	await connectdb("Follow " + followUsername);
	try {
		const user = await currentUser();
		const data = await followModel.findOne(
			{
				followUsername,
				userName: user?.username,
			},
			{ followUsername: 1 },
		);
		return data;
	} catch (error) {
		console.error(error);
	}
}
