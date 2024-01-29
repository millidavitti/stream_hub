import { connectdb } from "../connect";
import blockModel from "../models/block.model";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export async function isBlocked(userName: string) {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Is " + userName + " blocked");
	try {
		if (authenticatedUser) {
			const data = await blockModel
				.findOne({
					blockerUsername: authenticatedUser?.username,
					blockedUsername: userName,
				})
				.orFail();
			if (data) return true;
		}
	} catch (error) {
		console.log(error);
	}
	return false;
}
