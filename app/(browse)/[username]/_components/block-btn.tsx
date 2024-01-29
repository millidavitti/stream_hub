"use client";
import { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { blockAction } from "@/db/actions/block.action";

interface UnblockButtonProp {
	children: ReactNode;
	isBlocked: boolean;
	username: string;
}
export default function BlockButton({
	children,
	isBlocked,
	username,
}: UnblockButtonProp) {
	return (
		<Button
			disabled={isBlocked}
			onClick={async () => {
				const status = await blockAction(username);
				status && toast.success("You just blocked " + username);
			}}
		>
			{children}
		</Button>
	);
}
