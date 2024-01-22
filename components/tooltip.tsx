import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

interface ToolTipProps {
	label: string;
	children: React.ReactNode;
	asChild?: boolean;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
}

export default function ToolTip({
	children,
	label,
	align,
	asChild,
	side,
}: ToolTipProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className='text-black bg-white'
					side={side}
					align={align}
				>
					<p className='font-semibold'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
