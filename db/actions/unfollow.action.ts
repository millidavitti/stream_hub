"use server";
import unfollow from "../controllers/unfollow-user.controller";

export async function unfollowAction(args: any) {
	return await unfollow(args.username);
}
