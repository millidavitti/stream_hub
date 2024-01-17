import { Schema, model, models } from "mongoose";

const schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	imageUrl: String,
	authId: {
		type: String,
		unique: true,
	},
	bio: String,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
		default: Date.now(),
	},
});

export default models.User || model("User", schema);
