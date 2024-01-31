"use client";
import ToolTip from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { HostSidebarContext } from "@/state/functions/host-sidebar.state";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React, { useContext } from "react";

export default function Toggle() {
	const {
		hostSidebarDispatch,
		hostSidebarRuntimeState: { collapsed },
	} = useContext(HostSidebarContext);

	return (
		<>
			{collapsed && (
				<div className='w-full hidden lg:flex items-center justify-center pt-4 mb-4'>
					<ToolTip label='Expand' side='right' asChild>
						<Button
							onClick={() => hostSidebarDispatch({ type: "on_expand" })}
							variant='ghost'
							className='h-auto p-2'
						>
							<ArrowRightFromLine className='h-4 w-4' />
						</Button>
					</ToolTip>
				</div>
			)}
			{!collapsed && (
				<div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full'>
					<p className='font-semibold text-primary'>Dashboard</p>
					<ToolTip label='Collapse' side='right' asChild>
						<Button
							onClick={() => hostSidebarDispatch({ type: "on_collapse" })}
							variant='ghost'
							className='h-auto p-2 ml-auto'
						>
							<ArrowLeftFromLine className='h-4 w-4' />
						</Button>
					</ToolTip>
				</div>
			)}
		</>
	);
}
