import { Input } from "@/components/ui/input";
import React from "react";
import CopyButton from "./copy-btn";

interface UrlCardProp {
	value: string | undefined | null;
}

export default function UrlCard({ value }: UrlCardProp) {
	return (
		<div className='rounded-xl bg-muted p-6'>
			<div className='flex items-center gap-x-10'>
				<p className='font-semibold shrink-0'>Server URL</p>
				<div className='space-y-2 w-full'>
					<div className='w-full flex items-center gap-x-2'>
						<Input disabled value={value || ""} placeholder='Server URL' />
						<CopyButton value={value || ""} />
					</div>
				</div>
			</div>
		</div>
	);
}
