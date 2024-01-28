import { Document } from "mongoose";
import { connectdb } from "../connect";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";
import userModel from "../models/user.model";
import "../models/follow.model";

export default async function getFollows() {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Get user follows!");
	try {
		if (authenticatedUser) {
			const follows = (await userModel
				.findOne({ authId: authenticatedUser.id }, { follows: 1, userName: 1 })
				.populate({
					path: "follows",
					populate: {
						path: "follow",
						model: "User",
					},
				})
				.orFail()) as Document | any;

			return follows.toObject();
		} else console.log("User not signed in!");
	} catch (error) {
		console.log(error);
	}
}
