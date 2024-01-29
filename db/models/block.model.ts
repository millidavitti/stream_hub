import { Schema, model, models } from "mongoose";

const { ObjectId } = Schema.Types;

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
