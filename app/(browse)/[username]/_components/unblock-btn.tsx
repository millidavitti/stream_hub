"use client";
import { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { unblockAction } from "@/db/actions/unblock.action";

interface UnblockButtonProp {
	children: ReactNode;
	isBlocked: boolean;
	username: string;
}
export default function UnblockButton({
	children,
	isBlocked,
	username,
}: UnblockButtonProp) {
	return (
		<Button
			disabled={isBlocked}
			onClick={async () => {
				const status = await unblockAction(username);
				status && toast.success("You just unblocked " + username);
			}}
		>
			{children}
		</Button>
	);
}
