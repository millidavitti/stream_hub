import { Schema, model, models } from "mongoose";
const { ObjectId } = Schema.Types;

export interface Stream {
	host: object;
	name: object;
	thumbnail?: object;
	ingressId?: object;
	serverUrl?: object;
	isLive: object;
	isChatEnabled: object;
	isChatDelayed: object;
	allolwFollowersOnly: object;
}

const schema = new Schema(
	{
		host: {
			type: ObjectId,
			require: true,
			unique: true,
		},
		name: {
			type: String,
			require: true,
		},
		thumbnail: String,
		ingressId: String,
		serverUrl: String,
		isLive: {
			type: Boolean,
			default: false,
		},
		isChatEnabled: {
			type: Boolean,
			default: true,
		},
		isChatDelayed: {
			type: Boolean,
			default: false,
		},
		allolwFollowersOnly: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, strict: "throw" },
);

export default models.Stream || model("Stream", schema);
