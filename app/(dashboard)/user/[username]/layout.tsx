import { getCurrentUser } from "@/db/controllers/get-current-user.controller";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { NavBar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Container from "./_components/container";

interface HostLayout {
	children: ReactNode;
	params: { username: string };
}
export default async function HostLayout({ children, params }: HostLayout) {
	const host = await getCurrentUser(params.username);

	if (!host) redirect("/");

	return (
		<>
			<NavBar />
			<div className='flex h-full pt-20'>
				<Sidebar />
				<Container>
					Dashboard
					{children}
				</Container>
			</div>
		</>
	);
}
