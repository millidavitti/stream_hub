import "../models/follow.model";
import "../models/block.model";
import { Document } from "mongoose";
import { connectdb } from "../connect";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";
import userModel from "../models/user.model";
import { Block } from "../models/block.model";
import { revalidatePath } from "next/cache";

export default async function getFollows() {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Get user follows!");
	try {
		if (authenticatedUser) {
			const user = await userModel
				.findOne({ authId: authenticatedUser.id })
				.populate({
					path: "blocks",
				});

			const blockedUsernames = user.blocks.map(
				(block: Block) => block.blockedUsername,
			);

			const follows = (await userModel
				.findOne(
					{
						authId: authenticatedUser.id,
					},
					{ follows: 1, userName: 1 },
				)
				.populate({
					path: "follows",
					match: { followUsername: { $nin: blockedUsernames } },
					populate: {
						path: "follow",
						model: "User",
					},
				})) as Document;

			revalidatePath("/");

			console.log("Line 43: ", follows);
			return follows.toObject();
		} else console.log("User not signed in!");
	} catch (error) {
		console.log(error);
	}
}
