"use client";
import { cn } from "@/lib/utils";
import { SidebarContext } from "@/state/functions/sidebar.state";
import { useContext, useLayoutEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
interface ContainerProps {
	children: React.ReactNode;
}
export default function Container({ children }: ContainerProps) {
	const { sidebarRuntimeState, sidebarDispatch } = useContext(SidebarContext);
	const matches = useMediaQuery("(max-width: 1024px)");

	useLayoutEffect(() => {
		if (matches) sidebarDispatch({ type: "on_collapse" });
	}, [matches]);

	return (
		<div
			className={cn(
				"flex-1",
				sidebarRuntimeState.collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60",
			)}
		>
			{children}
		</div>
	);
}
