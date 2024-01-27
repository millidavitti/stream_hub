"use client";
import { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { unfollowAction } from "@/db/actions/unfollow.action";

interface FollowButtonProp {
	children: ReactNode;
	isFollowing: boolean;
	username: string;
}
export default function UnfollowButton({
	children,
	isFollowing,
	username,
}: FollowButtonProp) {
	return (
		<Button
			disabled={isFollowing}
			onClick={async () => {
				const status = await unfollowAction({ username });
				status && toast.success("You just unfollowed " + username);
			}}
		>
			{children}
		</Button>
	);
}
