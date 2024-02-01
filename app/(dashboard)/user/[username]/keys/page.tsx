import { getStream } from "@/db/controllers/get-stream.controller";
import React from "react";
import UrlCard from "./_components/url-card";
import { Stream } from "@/db/models/stream.model";
import KeyCard from "./_components/key-card";
import ConnectModal from "./_components/connect-modal";

export default async function KeysPage() {
	const stream: Stream = await getStream();
	return (
		<div className='p-6'>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl font-bold'>Keys & URLs</h1>
				<ConnectModal />
			</div>
			<div className='space-y-4'>
				<UrlCard value={stream.serverUrl} />
				<KeyCard value={stream.streamKey} />
			</div>
		</div>
	);
}
