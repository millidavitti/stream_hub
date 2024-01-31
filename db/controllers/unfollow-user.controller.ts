import { startSession } from "mongoose";
import { connectdb } from "../connect";
import followModel from "../models/follow.model";
import followerModel from "../models/follower.model";
import userModel from "../models/user.model";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

export default async function unfollow(userName: string) {
	const authenticatedUser = auth();

	await connectdb("Unfollow " + userName);

	const session = await startSession();

	try {
		await session.withTransaction(async () => {
			const user = await userModel
				.findOne({ authId: authenticatedUser.userId })
				.orFail();

			const followedUser = await userModel.findOne({ userName }).orFail();

			// Delete follows doc (the follower's relationship doc)
			await followModel
				.deleteOne({ user: user.id, follow: followedUser.id })
				.session(session)
				.orFail();

			// Delete followers doc (the followed relationship doc)
			await followerModel
				.deleteOne({ user: followedUser.id, follower: user.id })
				.session(session)
				.orFail();
		});
		await session.endSession();

		revalidatePath("/" + userName, "page");

		return true;
	} catch (error) {
		await session.endSession();
		console.log("\nTransaction: User Relationship Deletion Falied!");
		console.log(error);
	}
	return false;
}
