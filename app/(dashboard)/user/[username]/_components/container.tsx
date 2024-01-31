"use client";
import { cn } from "@/lib/utils";
import { HostSidebarContext } from "@/state/functions/host-sidebar.state";
import { useContext, useLayoutEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
interface ContainerProps {
	children: React.ReactNode;
}
export default function Container({ children }: ContainerProps) {
	const {
		hostSidebarRuntimeState: { collapsed },
		hostSidebarDispatch,
	} = useContext(HostSidebarContext);
	const matches = useMediaQuery("(max-width: 1024px)");

	useLayoutEffect(() => {
		if (matches) hostSidebarDispatch({ type: "on_collapse" });
	}, [matches]);

	return (
		<div
			className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
		>
			{children}
		</div>
	);
}
