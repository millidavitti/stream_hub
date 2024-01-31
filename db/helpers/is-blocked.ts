import { currentUser } from "@clerk/nextjs";
import { connectdb } from "../connect";
import blockModel from "../models/block.model";

export async function isBlocked(blockedUsername: string) {
	await connectdb("Is " + blockedUsername + " blocked");
	try {
		const user = await currentUser();

		const data = await blockModel.findOne({
			blockerUsername: user?.username,
			blockedUsername: blockedUsername,
		});

		if (data) return true;
	} catch (error) {
		console.log(error);
	}
	return false;
}
