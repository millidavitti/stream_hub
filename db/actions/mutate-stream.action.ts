"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../controllers/get-current-user.controller";
import streamModel, { Stream } from "../models/stream.model";

export async function mutateStream(values: Partial<Stream>) {
	try {
		const host = await getCurrentUser();

		await streamModel.updateOne({ host: host.id }, values).orFail();

		revalidatePath("/user/" + host.name + "/chat");
		revalidatePath("/user/" + host.name);
		revalidatePath("/" + host.name);

		return true;
	} catch (error) {
		console.log(error);
	}
	return false;
}
