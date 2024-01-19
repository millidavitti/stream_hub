"use server";

export async function searchAction(formData: FormData) {
	console.log("Search Query server action", formData.get("search_query"));
}
