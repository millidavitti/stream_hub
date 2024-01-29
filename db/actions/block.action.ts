"use server";
import { block } from "../controllers/block-user.controller";

export async function blockAction(blockedUsername: string) {
	return await block(blockedUsername);
}
