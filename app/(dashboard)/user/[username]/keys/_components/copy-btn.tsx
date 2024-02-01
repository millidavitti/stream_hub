"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProp {
	value: string | undefined | null;
}
export default function CopyButton({ value }: CopyButtonProp) {
	const [isCopied, setIsCopied] = useState(false);

	const Icon = isCopied ? CheckCheck : Copy;

	return (
		<Button
			onClick={() => {
				if (!value) return;

				setIsCopied(true);
				navigator.clipboard.writeText(value);

				setTimeout(() => setIsCopied(false), 1000);
			}}
			disabled={!value || isCopied}
			variant='ghost'
			size='sm'
		>
			<Icon className='h-4 w-4 cursor-pointer' />
		</Button>
	);
}
