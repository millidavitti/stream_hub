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
	},
	{
		timestamps: true,
		strict: "throw",
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

schema.virtual("followers", {
	ref: "Follower",
	localField: "userName",
	foreignField: "userName",
});

schema.virtual("follows", {
	ref: "Follow",
	localField: "userName",
	foreignField: "userName",
});

export default models.User || model("User", schema);
