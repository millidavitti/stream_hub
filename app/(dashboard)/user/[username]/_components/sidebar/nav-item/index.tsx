import { Skeleton } from "@/components/ui/skeleton";
import React, { ReactNode } from "react";

interface NavItemProp {
	children: ReactNode;
	isActive: boolean;
}
export default function NavItem({ children }: NavItemProp) {
	return <div className='flex items-center gap-x-4'>{children}</div>;
}

export function NavItemSkeleton() {
	return (
		<li className='flex items-center gap-x-4  px-3 py-4'>
			<Skeleton className='min-h-[48px] min-w-[48px] rounded-md' />
			<div className='flex-1 hidden lg:block'>
				<Skeleton className='h-6' />
			</div>
		</li>
	);
}
