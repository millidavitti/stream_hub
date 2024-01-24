import { connectdb } from "../connect";
import userModel from "../models/user.model";
import { Document } from "mongoose";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";
import { Error } from "mongoose";

export async function getCurrentUser() {
	const authUser = await getAuthenticatedUser();
	if (!authUser) throw new Error("User Unauthenticated!");

	await connectdb("Get Current User");

	try {
		const user: Document = await userModel
			.findOne({ authId: authUser.id })
			.orFail(new Error("User not found!"));

		return user.toObject();
	} catch (value) {
		const error = value as Error.DocumentNotFoundError;
		console.log(error.message);
		return {};
	}
}
