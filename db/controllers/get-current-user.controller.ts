import { currentUser } from "@clerk/nextjs/server";
import { connectdb } from "../connect";
import userModel from "../models/user.model";
import { Document } from "mongoose";

export async function getCurrentUser() {
	const authUser = await currentUser();

	if (!authUser) throw new Error("Unauthenticated!");

	await connectdb("Get Current User");

	const user: Document = await userModel
		.findOne({ authId: authUser.id })
		.orFail(new Error("User not found!"));

	return user.toObject();
}
