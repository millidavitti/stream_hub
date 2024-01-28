import { User } from "@clerk/nextjs/server";
import { Schema, models, model } from "mongoose";
const { ObjectId } = Schema.Types;

export interface Follower {
	user: string | User;
	userName: string;
	follower: string | User;
	followerUsername: string;
}

export const schema = new Schema(
	{
		user: {
			type: ObjectId,
			require: true,
		},

		userName: {
			type: String,
			require: true,
		},

		follower: {
			type: ObjectId,
			require: true,
		},

		followerUsername: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true, strict: "throw" },
);

export default models.Follower || model("Follower", schema);
