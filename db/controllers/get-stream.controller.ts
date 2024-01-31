import { auth } from "@clerk/nextjs";
import streamModel from "../models/stream.model";
import { getCurrentUser } from "./get-current-user.controller";

export async function getStream() {
	try {
		const host = await getCurrentUser();
		return await streamModel.findOne({ host: host.id });
	} catch (error) {
		console.log(error);
	}
	return null;
}
