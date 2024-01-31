import { currentUser } from "@clerk/nextjs";

export async function getAuthenticatedUser() {
	try {
		return await currentUser();
	} catch (error) {
		console.log(error);
	}
}
