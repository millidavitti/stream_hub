import "../models/follow.model";
import "../models/block.model";
import { Document } from "mongoose";
import { connectdb } from "../connect";
import userModel from "../models/user.model";
import { Block } from "../models/block.model";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

export default async function getFollows() {
	const authenticatedUser = auth();

	await connectdb("Get user follows!");
	try {
		const user = await userModel
			.findOne({ authId: authenticatedUser.userId })
			.populate({
				path: "blocks",
			});

		const blockedUsernames = user.blocks.map(
			(block: Block) => block.blockedUsername,
		);

		const follows = (await userModel
			.findOne(
				{
					authId: authenticatedUser.userId,
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

		return follows.toObject();
	} catch (error) {
		console.log(error);
	}
}
