import { getRecommendedUsers } from "@/db/controllers/get-recommend-users.controller";
import Recommended, { RecommendedUsersSkeleton } from "./recommended-users";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";
import getFollows from "@/db/controllers/get-user-follows.controller";
import Follows, { FollowsSkeleton } from "./follows";

export async function Sidebar() {
	const [recommendedUsers, follows] = await Promise.all([
		getRecommendedUsers(),
		getFollows(),
	]);

	return (
		<Wrapper>
			<Toggle />
			<div className='space-y-4 pt-4 lg:pt-0'>
				{follows && <Follows data={follows.follows} />}
				<Recommended data={recommendedUsers} />
			</div>
		</Wrapper>
	);
}

export function SidebarSkeleton() {
	return (
		<aside className='fixed left-0 flex flex-col w-[70px] lg:w-60'>
			<FollowsSkeleton />
			<RecommendedUsersSkeleton />
		</aside>
	);
}
