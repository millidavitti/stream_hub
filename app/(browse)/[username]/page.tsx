import { isFollowing } from "@/db/helpers/isFollowing";

import FollowButton from "./_components/follow-btn";
import UnfollowButton from "./_components/unfollow-btn";

interface UserPageProps {
	userName: string;
	params: any;
}

export default async function UserPage({ params }: UserPageProps) {
	const status = await isFollowing(params.username);
	console.log("Is current user following " + params.username + ":", !!status);

	return (
		<div>
			<FollowButton isFollowing={!!status} username={params.username}>
				Follow
			</FollowButton>
			<UnfollowButton isFollowing={!!!status} username={params.username}>
				Unfollow
			</UnfollowButton>
		</div>
	);
}
