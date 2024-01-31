"use client";
import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import NavItem, { NavItemSkeleton } from "./nav-item";
import NavLabel from "./nav-item/nav-label";
import NavIcon from "./nav-item/nav-icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HostSidebarContext } from "@/state/functions/host-sidebar.state";
import Link from "next/link";

export default function Navigation() {
	const pathname = usePathname();
	const { user } = useUser();
	const {
		hostSidebarRuntimeState: { collapsed },
	} = useContext(HostSidebarContext);
	const routes = useNavigationRoutes(user?.username as string);

	if (!user)
		return (
			<ul>
				{[...Array(4)].map((_, i) => (
					<NavItemSkeleton key={i} />
				))}
			</ul>
		);

	return (
		<ul className='space-y-2 px-2 pt-4 lg:pt-0'>
			{routes.map((route: (typeof routes)[0]) => (
				<Link href={route.href} key={route.href}>
					<Button
						variant='ghost'
						className={cn(
							"w-full h-12",
							collapsed ? "justify-center" : "justify-start",
						)}
					>
						<NavItem isActive={pathname === route.href}>
							<NavIcon>
								<route.icon
									className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")}
								/>
								{!collapsed && <NavLabel>{route.label}</NavLabel>}
							</NavIcon>
						</NavItem>
					</Button>
				</Link>
			))}
		</ul>
	);
}

function useNavigationRoutes(username: string) {
	return [
		{
			label: "Stream",
			href: "/" + username,
			icon: Fullscreen,
		},
		{
			label: "Keys",
			href: "/" + username + "/keys",
			icon: KeyRound,
		},
		{
			label: "Chat",
			href: "/" + username + "/chat",
			icon: MessageSquare,
		},
		{
			label: "Community",
			href: "/" + username + "/community",
			icon: Users,
		},
	];
}
