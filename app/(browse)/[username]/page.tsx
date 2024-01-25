"use client";
import { Button } from "@/components/ui/button";
import { followAction } from "@/db/actions/follow.action";
import { usePathname } from "next/navigation";
import React from "react";

interface UserPageProps {
	userName: string;
}
export default function UserPage({}: UserPageProps) {
	const segment = usePathname();

	return (
		<div>
			<Button onClick={() => followAction(segment.slice(1))}>Follow</Button>
		</div>
	);
}
