"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import CopyButton from "./copy-btn";
import { Button } from "@/components/ui/button";
interface KeyCardProp {
	value: string | undefined | null;
}
export default function KeyCard({ value }: KeyCardProp) {
	const [showKey, setShowKey] = useState(false);

	return (
		<div className='rounded-xl bg-muted p-6'>
			<div className='flex items-start gap-x-10'>
				<p className='font-semibold shrink-0'>Stream Key</p>
				<div className='space-y-2 w-full'>
					<div className='w-full flex items-center gap-x-2'>
						<Input
							value={value || ""}
							type={showKey ? "text" : "password"}
							disabled
							placeholder='Stream Key'
						/>
						<CopyButton value={value || ""} />
					</div>
					<Button size='sm' variant='link' onClick={() => setShowKey(!showKey)}>
						Show
					</Button>
				</div>
			</div>
		</div>
	);
}
