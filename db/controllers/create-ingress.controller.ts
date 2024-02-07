import {
	IngressAudioEncodingPreset,
	IngressInput,
	IngressClient,
	IngressVideoEncodingPreset,
	RoomServiceClient,
	CreateIngressOptions,
} from "livekit-server-sdk";

import { getCurrentUser } from "../controllers/get-current-user.controller";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import streamModel from "../models/stream.model";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export async function createIngress(ingressType: IngressInput) {
	const host = await getCurrentUser();

	await resetIngress(host.id);

	const options: CreateIngressOptions = {
		name: host.username,
		roomName: host.id,
		participantName: host.username,
		participantIdentity: host.id,
	};

	if (ingressType === IngressInput.WHIP_INPUT) {
		options.bypassTranscoding = true;
	} else {
		options.video = {
			source: TrackSource.CAMERA,
			preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
		};
		options.audio = {
			source: TrackSource.MICROPHONE,
			preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
		};
	}
	const ingress = await ingressClient.createIngress(ingressType, options);

	if (!ingress) throw new Error("Failed to create ingress!");

	try {
		await streamModel.updateOne(
			{ host: host.id },
			{
				ingressId: ingress.ingressId,
				serverUrl: ingress.url,
				streamKey: ingress.streamKey,
			},
		);
	} catch (error) {
		console.log(error);
	}

	revalidatePath("/user/" + host.username + "/keys");
	return ingress;
}

export async function resetIngress(host: string) {
	const ingresses = await ingressClient.listIngress({
		roomName: host,
	});

	const rooms = await roomService.listRooms([host]);

	for (const room of rooms) await roomService.deleteRoom(room.name);
	for (const ingress of ingresses)
		ingress.ingressId && (await ingressClient.deleteIngress(ingress.ingressId));
}
