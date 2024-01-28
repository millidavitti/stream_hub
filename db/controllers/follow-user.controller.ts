import { startSession } from "mongoose";
import { connectdb } from "../connect";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";
import userModel from "../models/user.model";
import followModel, { Follow } from "../models/follow.model";
import followerModel, { Follower } from "../models/follower.model";
import { revalidatePath } from "next/cache";

export async function follow(userName: string) {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Follow " + userName);

	const session = await startSession();

	try {
		// Get following user doc
		const user = await userModel
			.findOne({ authId: authenticatedUser?.id }, { _id: 1, userName: 1 })
			.orFail();

		const followedUser = await userModel
			.findOne({ userName }, { _id: 1, userName: 1 })
			.orFail();

		await session.withTransaction(async () => {
			// Create Follow Doc (Registers a follow for the follower)
			const guard = await followModel.findOne({
				user: user.id,
				follow: followedUser.id,
			});

			if (guard) throw new Error();

			await followModel.create({
				follow: followedUser.id,
				user: user.id,
				userName: user.userName,
				followUsername: followedUser.userName,
			} as Follow);

			// Create Follower Doc (Registers a follower for the followed)

			await followerModel.create({
				follower: user.id,
				user: followedUser.id,
				userName: followedUser.userName,
				followerUsername: user.userName,
			} as Follower);

			console.log("Documents Created!");
			console.log("Follwer: ", user);
			console.log("Follwed: ", followedUser);
		});
		await session.endSession();
		revalidatePath("/" + userName, "page");
		return true;
	} catch (error) {
		await session.endSession();
		console.log("\nTransaction: User Relationship Update Falied!");
		console.log(error);
	}
	return false;
}
