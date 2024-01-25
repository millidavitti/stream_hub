import { Schema, models, model } from "mongoose";
const { ObjectId } = Schema.Types;

export interface Follow {
	user: string | object;
	userName: string;
	follow: string | object;
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
