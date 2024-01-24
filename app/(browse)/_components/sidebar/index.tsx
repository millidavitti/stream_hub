// import getRecommendedUsers from "@db/";
import { getRecommendedUsers } from "@/db/controllers/get-recommend-users.controller";
import Recommended, { RecommendedUsersSkeleton } from "./recommended-users";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export async function Sidebar() {
	const recommendedUsers = await getRecommendedUsers();
	return (
		<Wrapper>
			<Toggle />
			<div className='space-y-4 pt-4 lg:pt-0'>
				<Recommended data={recommendedUsers} />
			</div>
		</Wrapper>
	);
}

export function SidebarSkeleton() {
	return (
		<aside className='fixed left-0 flex flex-col w-[70px] lg:w-60'>
			<RecommendedUsersSkeleton />
		</aside>
	);
}
