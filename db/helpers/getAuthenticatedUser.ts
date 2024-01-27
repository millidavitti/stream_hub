import { currentUser } from "@clerk/nextjs/server";

export async function getAuthenticatedUser(retries = 3) {
	if (retries < 1) {
		console.log("Failed to get authenticated user after multiple retries");
		return null;
	}

	try {
		return await currentUser();
	} catch {
		return await getAuthenticatedUser(retries - 1);
	}
}
