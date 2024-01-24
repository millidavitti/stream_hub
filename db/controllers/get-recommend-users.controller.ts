import { Document } from "mongoose";
import { connectdb } from "../connect";
import userModel from "../models/user.model";

export async function getRecommendedUsers() {
	await connectdb("Get Recommended Users");

	const users = await userModel.find({}).sort("desc").orFail();

	const usersPlainObjects = users.map((user: Document) => user.toObject());

	return usersPlainObjects;
}
