"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { mutateStream } from "@/db/actions/mutate-stream.action";
import React from "react";
import { toast } from "sonner";
type FieldTypes = "isChatEnabled" | "isChatDelayed" | "allolwFollowersOnly";

interface ToggleCardProp {
	value: boolean;
	field: FieldTypes;
	label: string;
}
export default function ToggleCard({ value, field, label }: ToggleCardProp) {
	return (
		<div className='rounded-xl bg-muted p-6'>
			<div className='flex items-center justify-between'>
				<p className='font-semibold shrink-0'>{label}</p>
				<p className='space-y-2'>
					<Switch
						checked={value}
						onCheckedChange={async () => {
							const status = await mutateStream({ [field]: !value });

							status
								? toast.success("Chat settings updated!")
								: toast.error("Chat settings update failed!");
						}}
					>
						{value ? "On" : "Off"}
					</Switch>
				</p>
			</div>
		</div>
	);
}

export function ToggleCardSkeleton() {
	return <Skeleton className='rounded-xl p-10 w-full' />;
}

