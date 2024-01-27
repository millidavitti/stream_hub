"use server";
import { follow } from "@/db/controllers/follow-user.controller";

export async function followAction(args: any) {
	return await follow(args.username);
}
