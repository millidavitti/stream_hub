"use client";
import { Button } from "@/components/ui/button";
import { followAction } from "@/db/actions/follow.action";
import React, { ReactNode } from "react";
import { toast } from "sonner";

interface FollowButtonProp {
	children: ReactNode;
	isFollowing: boolean;
	username: string;
}
export default function FollowButton({
	children,
	isFollowing,
	username,
}: FollowButtonProp) {
	return (
		<Button
			disabled={isFollowing}
			onClick={async () => {
				const status = await followAction({ username });
				status && toast.success("You just followed " + username);
			}}
		>
			{children}
		</Button>
	);
}
