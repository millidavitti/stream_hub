import { revalidatePath } from "next/cache";
import { connectdb } from "../connect";
import blockModel from "../models/block.model";
import userModel from "../models/user.model";
import { auth } from "@clerk/nextjs";

export async function unblock(blockedUsername: string) {
	const authenticatedUser = auth();

	await connectdb("Unblock user: " + blockedUsername);

	try {
		const blocker = await userModel
			.findOne({ authId: authenticatedUser.userId })
			.orFail();

		const blocked = await userModel
			.findOne({ userName: blockedUsername })
			.orFail();

		await blockModel
			.deleteOne({ blocked: blocked.id, blocker: blocker.id })
			.orFail();

		revalidatePath("/" + blockedUsername, "page");

		console.log(blockedUsername + " is unblocked!");

		return true;
	} catch (error) {
		console.log(error);
	}

	return false;
}
