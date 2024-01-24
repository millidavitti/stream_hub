"use client";
import { User } from "@/db/models/user.model";
import { SidebarContext } from "@/state/functions/sidebar.state";
import { useContext } from "react";
import UserItem, { UserItemSkeleton } from "./user-item";

interface RecommendedUsers {
	data: User[];
}

export default function RecommendedUsers({ data }: RecommendedUsers) {
	const {
		sidebarRuntimeState: { collapsed },
	} = useContext(SidebarContext);

	const showLabel = !collapsed && data.length > 0;
	return (
		<div>
			{showLabel && (
				<div className='pl-6 mb-4'>
					<p className='text-sm text-muted-foreground'>Recommended</p>
				</div>
			)}
			<ul className='space-y-2 px-2'>
				{data.map((user) => (
					<UserItem
						key={user.authId}
						userName={user.userName}
						imageUrl={user.imageUrl}
						isLive={true}
					/>
				))}
			</ul>
		</div>
	);
}

export function RecommendedUsersSkeleton() {
	return (
		<ul className='px-2'>
			{[...Array(3).map((_, i) => <UserItemSkeleton key={i} />)]}
		</ul>
	);
}
