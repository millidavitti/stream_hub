import { ReactNode } from "react";

interface NavIconProp {
	children: ReactNode;
}
export default function NavIcon({ children }: NavIconProp) {
	return <div className='flex items-center gap-x-4'>{children}</div>;
}
