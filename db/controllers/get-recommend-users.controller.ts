import { Document, Error } from "mongoose";
import { connectdb } from "../connect";
import userModel from "../models/user.model";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";
import { Follow } from "../models/follow.model";
import { Block } from "../models/block.model";

export async function getRecommendedUsers() {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Get Recommended Users");

	try {
		if (authenticatedUser) {
			const user = await userModel
				.findOne({ authId: authenticatedUser.id })
				.populate({
					path: "follows",
				})
				.populate({
					path: "blocks",
				});

			// Get the usernames of all the users that the authenticated user is following
			const exclusion = await Promise.all([
				...user.follows.map((follow: Follow) => follow.followUsername),
				...user.blocks.map((block: Block) => block.blockedUsername),
			]);

			const users = await userModel
				.find()
				.where("authId")
				.ne(authenticatedUser.id)
				.where("userName")
				.nin(exclusion)
				.sort("desc")
				.orFail();
			console.log(users);
			const usersPlainObjects = users.map((user: Document) => user.toObject());

			return usersPlainObjects;
		} else {
			const users = await userModel.find().sort("desc").orFail();

			const usersPlainObjects = users.map((user: Document) => user.toObject());
			return usersPlainObjects;
		}
	} catch (val) {
		const error = val as Error.DocumentNotFoundError;
		console.log(error.message);
		return [];
	}
}
