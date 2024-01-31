import { connectdb } from "../connect";
import blockModel from "../models/block.model";
import { getAuthenticatedUser } from "./get-authenticated-user";

export async function isBlocked(blockedUsername: string) {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Is " + blockedUsername + " blocked");
	try {
		if (authenticatedUser) {
			const data = await blockModel.findOne({
				blockerUsername: authenticatedUser.username,
				blockedUsername: blockedUsername,
			});

			if (data) return true;
		}
	} catch (error) {
		console.log(error);
	}
	return false;
}
