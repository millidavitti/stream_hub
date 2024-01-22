"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { SidebarContext } from "@/state/functions/sidebar.state";
import ToolTip from "@/components/tooltip";

export function Toggle() {
	const { sidebarDispatch, sidebarRuntimeState } = useContext(SidebarContext);

	return (
		<div>
			{sidebarRuntimeState.collapsed && (
				<div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
					<ToolTip label='Expand' asChild>
						<Button
							variant='ghost'
							className='h-auto p-2'
							onClick={() => sidebarDispatch({ type: "on_expand" })}
						>
							<ArrowRightFromLine className='h-4 w-4' />
						</Button>
					</ToolTip>
				</div>
			)}
			{!sidebarRuntimeState.collapsed && (
				<div className='p-3 pl-6 mb-2 flex items-center w-full'>
					<p className='font-semibold text-primary'>For you</p>
					<ToolTip label='Collapse' asChild>
						<Button
							className='h-auto p-2 ml-auto'
							variant='ghost'
							onClick={() => sidebarDispatch({ type: "on_collapse" })}
						>
							<ArrowLeftFromLine className='h-4 w-4' />
						</Button>
					</ToolTip>
				</div>
			)}
		</div>
	);
}
