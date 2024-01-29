import { currentUser } from "@clerk/nextjs/server";

export async function getAuthenticatedUser() {
	try {
		return await currentUser();
	} catch (error) {
		console.log(error);
	}
}
