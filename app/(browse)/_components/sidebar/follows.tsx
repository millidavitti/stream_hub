"use client";
import { Follow } from "@/db/models/follow.model";
import { SidebarContext } from "@/state/functions/sidebar.state";
import React, { useContext } from "react";
import UserItem, { UserItemSkeleton } from "./user-item";
import { User } from "@/db/models/user.model";

interface FollowProp {
	data: Follow[];
}

export default function Follows({ data }: FollowProp) {
	const {
		sidebarRuntimeState: { collapsed },
	} = useContext(SidebarContext);

	return (
		<div>
			{!data.length ||
				(!collapsed && (
					<div className='pl-6 mb-4'>
						<p className='text-sm text-muted-foreground'>Follows</p>
					</div>
				))}
			<ul className='space-y-2 px-2'>
				{data.map((follow) => (
					<UserItem
						key={follow.follow as string}
						userName={follow.followUsername}
						imageUrl={(follow.follow as User).imageUrl}
					/>
				))}
			</ul>
		</div>
	);
}

export function FollowsSkeleton() {
	return (
		<ul className='px-2 pt-2 lg:pt-0'>
			{[...Array(3)].map((_, i) => (
				<UserItemSkeleton key={i} />
			))}
		</ul>
	);
}
