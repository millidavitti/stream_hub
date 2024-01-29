import { Schema, model, models } from "mongoose";
import { User } from "./user.model";

const { ObjectId } = Schema.Types;

export interface Block {
	blocker: string | User;
	blockerUsername: string;
	blocked: string | User;
	blockedUsername: string;
}
const schema = new Schema(
	{
		blocker: {
			type: ObjectId,
			ref: "User",
		},
		blockerUsername: {
			type: String,
			require: true,
		},
		blocked: {
			type: ObjectId,
			ref: "User",
		},
		blockedUsername: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true, strict: "throw" },
);

export default models.Block || model("Block", schema);
