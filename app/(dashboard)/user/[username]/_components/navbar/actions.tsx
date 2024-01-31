import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";

export async function Actions() {
	return (
		<div className='flex items-center justify-end gap-x-2'>
			<Link href='/'>
				<Button
					size='sm'
					variant='ghost'
					className='text-muted-foreground hover:text-primary'
				>
					<LogOut />
					Exit
				</Button>
			</Link>
			<UserButton afterSignOutUrl='/' />
		</div>
	);
}
