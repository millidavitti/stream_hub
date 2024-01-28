import { Schema, models, model } from "mongoose";
import { User } from "./user.model";
const { ObjectId } = Schema.Types;

export interface Follow {
	user: string | User;
	userName: string;
	follow: string | User;
	followUsername: string;
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

		follow: {
			type: ObjectId,
			require: true,
		},

		followUsername: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true, strict: "throw" },
);

export default models.Follow || model("Follow", schema);
