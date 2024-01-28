import { Document, Error } from "mongoose";
import { connectdb } from "../connect";
import userModel from "../models/user.model";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";
import { Follow } from "../models/follow.model";

export async function getRecommendedUsers() {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Get Recommended Users");

	try {
		if (authenticatedUser) {
			const user = await userModel
				.findOne({ authId: authenticatedUser.id })
				.populate({
					path: "follows",
				});

			// Get the usernames of all the users that the authenticated user is following
			const followedUsernames = user.follows.map(
				(follow: Follow) => follow.followUsername,
			);
			const users = await userModel
				.find()
				.where("authId")
				.ne(authenticatedUser.id)
				.where("userName")
				.nin(followedUsernames)
				.sort("desc")
				.orFail();

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
