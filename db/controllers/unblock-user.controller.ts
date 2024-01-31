import { revalidatePath } from "next/cache";
import { connectdb } from "../connect";
import { getAuthenticatedUser } from "../helpers/get-authenticated-user";
import blockModel from "../models/block.model";
import userModel from "../models/user.model";

export async function unblock(blockedUsername: string) {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Unblock user: " + blockedUsername);

	try {
		const blocker = await userModel
			.findOne({ authId: authenticatedUser?.id })
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
