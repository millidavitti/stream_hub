"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<Button variant='destructive' onClick={() => console.log("first")}>
			Click
		</Button>
	);
}
