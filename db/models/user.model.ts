import { Schema, model, models } from "mongoose";

export interface User {
	_id: string;
	userName: string;
	imageUrl: string;
	authId: string;
	bio: string;
	createdAt: Date;
	updatedAt: Date;
}

const schema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			minLength: 3,
		},
		imageUrl: {
			type: String,
		},
		authId: {
			type: String,
			unique: true,
			required: true,
		},
		bio: {
			type: String,
			default: "I am a Stream Hub User!",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ strict: "throw" },
);

export default models.User || model("User", schema);
