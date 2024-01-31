"use client";
import { cn } from "@/lib/utils";
import { HostSidebarContext } from "@/state/functions/host-sidebar.state";
import { ReactNode, useContext } from "react";

interface WrapperProp {
	children: ReactNode;
}

export default function Wrapper({ children }: WrapperProp) {
	const {
		hostSidebarRuntimeState: { collapsed },
	} = useContext(HostSidebarContext);
	return (
		<aside
			className={cn(
				"fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-width",
				collapsed && "w-[70px] transition-width",
			)}
		>
			{children}
		</aside>
	);
}
