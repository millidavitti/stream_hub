import { ReactNode } from "react";
import { Logo } from "./_components/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className='h-full flex flex-col items-center justify-center gap-y-6'>
			<Logo />
			{children}
		</div>
	);
}
