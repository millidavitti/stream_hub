import { Document } from "mongoose";
import { connectdb } from "../connect";
import userModel from "../models/user.model";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";

export async function getRecommendedUsers() {
	const authenticatedUser = await getAuthenticatedUser();

	await connectdb("Get Recommended Users");

	const users = await userModel
		.find({})
		.sort("desc")
		.where("authId")
		.ne(authenticatedUser?.id)
		.orFail();

	const usersPlainObjects = users.map((user: Document) => user.toObject());

	return usersPlainObjects;
}
