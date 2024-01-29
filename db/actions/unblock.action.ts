"use server";
import { unblock } from "../controllers/unblock-user.controller";

export async function unblockAction(blockedUsername: string) {
	return await unblock(blockedUsername);
}
