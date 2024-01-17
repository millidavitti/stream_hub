"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { UserButton } from "@clerk/nextjs";
import mongoose from "mongoose";

export default function Home() {
	return <UserButton afterSignOutUrl='/' />;
}
