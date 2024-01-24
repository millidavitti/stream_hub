import { currentUser } from "@clerk/nextjs/server";

export async function getAuthenticatedUser() {
	return await currentUser();
}
