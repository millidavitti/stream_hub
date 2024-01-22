"use client";

import { cn } from "@/lib/utils";
import { SidebarContext } from "@/state/functions/sidebar.state";
import { useContext } from "react";
interface WrapperProps {
	children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
	const { sidebarRuntimeState } = useContext(SidebarContext);
	return (
		<aside
			className={cn(
				"fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50 transition-width",
				sidebarRuntimeState.collapsed && "w-[70px] transition-width",
			)}
		>
			{children}
		</aside>
	);
}
