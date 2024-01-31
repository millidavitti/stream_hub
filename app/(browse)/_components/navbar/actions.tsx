import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export async function Actions() {
	let user;

	try {
		user = await currentUser();
	} catch (error) {
		console.log(error);
	}

	return (
		<div className='flex items-center justify-end gap-x-2 ml-4 lg:ml-0'>
			{!user && (
				<SignInButton>
					<Button size='sm' variant='primary'>
						Login
					</Button>
				</SignInButton>
			)}
			{user && (
				<div className='flex items-center gap-x-4'>
					<Link href={`/user/${user.username}`}>
						<Button
							className='text-muted-foreground hover:text-primary'
							size='sm'
							variant='ghost'
						>
							<Clapperboard className='h-5 w-5 lg:mr-2' />
							<span className='hidden lg:block'>Dashboard</span>
						</Button>
					</Link>
					<UserButton afterSignOutUrl='/' />
				</div>
			)}
		</div>
	);
}
