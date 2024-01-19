"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchAction } from "@/db/actions/search.action";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Search() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");

	const queryParams = new URLSearchParams();
	queryParams.set("search_query", searchQuery);
	return (
		<form
			className='relative w-full lg:w-[400px] flex items-center'
			action={searchAction}
			onSubmit={() => searchQuery && router.push("/?" + queryParams.toString())}
		>
			<Input
				placeholder='Search'
				name='search_query'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
			/>
			{searchQuery && (
				<X
					className='absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition'
					onClick={() => setSearchQuery("")}
				/>
			)}
			<Button
				type='submit'
				size='sm'
				variant='secondary'
				className='rounded-l-none'
			>
				<SearchIcon />
			</Button>
		</form>
	);
}
