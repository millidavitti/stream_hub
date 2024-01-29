import { revalidatePath } from "next/cache";
import { connectdb } from "../connect";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";
import blockModel, { Block } from "../models/block.model";
import userModel from "../models/user.model";

export async function block(blockedUsername: string) {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Block user: " + blockedUsername);

	try {
		// Find the user who is blocking by their authId
		const blocker = await userModel
			.findOne({ authId: authenticatedUser?.id })
			.orFail();

		// Find the user who is being blocked by their username
		const blocked = await userModel
			.findOne({ userName: blockedUsername })
			.orFail();

		// Check if a block document already exists between the blocker and the blocked user
		const blockDoc = await blockModel.findOne({
			blocker: blocker.id,
			blocked: blocked.id,
		});

		// If a block document already exists, throw an error
		if (blockDoc) throw new Error("User has been blocked!");

		// If no block document exists, create a new one
		await blockModel.create({
			blocker: blocker.id,
			blockerUsername: blocker.userName,
			blocked: blocked.id,
			blockedUsername: blocked.userName,
		} as Block);

		revalidatePath("/" + blockedUsername, "page");

		console.log(blocked.userName + " is blocked!");

		return true;
	} catch (error) {
		console.log(error);
	}

	return false;
}
