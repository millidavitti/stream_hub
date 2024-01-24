import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LiveBage from "./live-bage";

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
	userName: string;
	imageUrl: string;
	isLive?: boolean;
	showBadge?: boolean;
}

const avatarSizes = cva("", {
	variants: {
		size: {
			default: "h-8 w-8",
			lg: "h-14 w-14",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

export default function UserAvatar({
	userName,
	imageUrl,
	isLive,
	showBadge,
	size,
}: UserAvatarProps) {
	const canShowBadge = showBadge && isLive;
	return (
		<div className='relative'>
			<Avatar
				className={cn(
					isLive && "ring-2 ring-rose-800 ring-offset-2 border-background",
					avatarSizes({ size }),
				)}
			>
				<AvatarImage src={imageUrl} className='object-cover' />
				<AvatarFallback>
					{userName[0].toUpperCase()}
					{userName.at(-1)?.toUpperCase()}
				</AvatarFallback>
			</Avatar>
			{canShowBadge && (
				<div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
					<LiveBage />
				</div>
			)}
		</div>
	);
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps) {
	return (
		<Skeleton className={cn("rounded-full", avatarSizes({ size }))}></Skeleton>
	);
}
