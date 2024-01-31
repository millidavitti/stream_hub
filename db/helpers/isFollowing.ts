import followModel from "../models/follow.model";
import { getAuthenticatedUser } from "./get-authenticated-user";

export async function isFollowing(followUsername: string) {
	const authenticatedUser = await getAuthenticatedUser();

	try {
		const data = await followModel.findOne(
			{
				followUsername,
				userName: authenticatedUser?.username,
			},
			{ followUsername: 1 },
		);
		return data;
	} catch {
		console.log(
			"Failed to determine the follow status: " +
				authenticatedUser?.username +
				"=>" +
				followUsername,
		);
	}
}
