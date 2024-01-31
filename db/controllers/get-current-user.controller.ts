import { connectdb } from "../connect";
import userModel from "../models/user.model";
import { Document } from "mongoose";
import { Error } from "mongoose";
import { auth } from "@clerk/nextjs";

export async function getCurrentUser(userName: string) {
	const authenticatedUser = auth();

	await connectdb("Get Current User");

	try {
		const user: Document = await userModel
			.findOne({
				authId: authenticatedUser.userId,
				userName,
			})
			.orFail(new Error("User not found!"));

		console.log("LINE 20: ", user);
		return user.toObject();
	} catch (value) {
		const error = value as Error.DocumentNotFoundError;
		console.log(error.message);
	}
	return null;
}
