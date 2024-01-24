import { NavBar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import Container from "./_components/container";
import { Suspense } from "react";

export default function BrowseLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// getLocal();

	return (
		<>
			<NavBar />
			<div className='flex h-full pt-20'>
				<Suspense fallback={<SidebarSkeleton />}>
					<Sidebar />
				</Suspense>
				<Container>{children}</Container>
			</div>
			;
		</>
	);
}
