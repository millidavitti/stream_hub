import { connectdb } from "../connect";
import userModel from "../models/user.model";
import { Document } from "mongoose";
import { getAuthenticatedUser } from "../helpers/getAuthenticatedUser";

export async function getCurrentUser() {
	const authUser = await getAuthenticatedUser();
	if (!authUser) throw new Error("User Unauthenticated!");

	await connectdb("Get Current User");

	const user: Document = await userModel
		.findOne({ authId: authUser.id })
		.orFail(new Error("User not found!"));

	return user.toObject();
}
