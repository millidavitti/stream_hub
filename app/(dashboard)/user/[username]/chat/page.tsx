import { getStream } from "@/db/controllers/get-stream.controller";
import { Stream } from "@/db/models/stream.model";
import React from "react";
import ToggleCard from "./_components/toggle-card";

export default async function Chat() {
	const stream: Stream = await getStream();
	return (
		<div className='p-6'>
			<div className='mb-4'>
				<h1 className='text-2xl font-bold'>Chat settings</h1>
			</div>
			<div className='space-y-4'>
				<ToggleCard
					field='isChatEnabled'
					label='Enable Chat'
					value={stream.isChatEnabled}
				/>
				<ToggleCard
					field='isChatDelayed'
					label='Delay Chat'
					value={stream.isChatDelayed}
				/>
				<ToggleCard
					field='allolwFollowersOnly'
					label='Allow only followers'
					value={stream.allolwFollowersOnly}
				/>
			</div>
		</div>
	);
}
