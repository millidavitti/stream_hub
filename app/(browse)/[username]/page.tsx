import { isFollowing } from "@/db/helpers/isFollowing";
import FollowButton from "./_components/follow-btn";
import UnfollowButton from "./_components/unfollow-btn";
import BlockButton from "./_components/block-btn";
import { isBlocked } from "@/db/helpers/is-blocked";
import UnblockButton from "./_components/unblock-btn";

interface UserPageProps {
	params: any;
}

export default async function UserPage({ params }: UserPageProps) {
	const status = await isFollowing(params.username);
	const blockedStatus = await isBlocked(params.username);
	console.log("Is current user following " + params.username + ":", !!status);
	console.log("Has blocked " + params.username + ":", blockedStatus);

	return (
		<div className='flex gap-2'>
			{status ? (
				<UnfollowButton isFollowing={!!!status} username={params.username}>
					Unfollow
				</UnfollowButton>
			) : (
				<FollowButton isFollowing={!!status} username={params.username}>
					Follow
				</FollowButton>
			)}
			{blockedStatus ? (
				<UnblockButton isBlocked={!blockedStatus} username={params.username}>
					Unblock
				</UnblockButton>
			) : (
				<BlockButton isBlocked={blockedStatus} username={params.username}>
					Block
				</BlockButton>
			)}
		</div>
	);
}
