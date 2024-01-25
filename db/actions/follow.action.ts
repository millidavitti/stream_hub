"use server";

import { follow } from "../controllers/follow-user.controller";

export async function followAction(userName: string) {
	await follow(userName);
}
