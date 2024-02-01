import { Schema, model, models } from "mongoose";
const { ObjectId } = Schema.Types;

export interface Stream {
	host: string;
	name: string;
	thumbnail?: string;
	ingressId?: string;
	serverUrl?: string;
	streamKey?: string;
	isLive: boolean;
	isChatEnabled: boolean;
	isChatDelayed: boolean;
	allolwFollowersOnly: boolean;
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
		thumbnail: { type: String, default: null },
		ingressId: { type: String, default: null },
		serverUrl: { type: String, default: null },
		streamKey: { type: String, default: null },
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
