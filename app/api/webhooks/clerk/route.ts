import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import userModel from "@/db/models/user.model";
import { connectdb } from "@/db/connect";
import streamModel, { Stream } from "@/db/models/stream.model";

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const webHook = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = webHook.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	// Get the ID and type
	const eventType = evt.type;

	// User Date Sync with Database
	switch (eventType) {
		case "user.created":
			{
				try {
					await connectdb("Create User");
					const user = new userModel({
						authId: evt.data.id,
						userName: evt.data.username,
						imageUrl: evt.data.image_url,
					});

					await userModel.create(user);

					await streamModel.create({
						host: user.id,
						name: user.userName,
					} as Stream);

					console.log("New user created!");
				} catch (error) {
					console.log(error);
				}
			}
			break;
		case "user.updated":
			{
				await connectdb("Update User");
				try {
					const update = {
						authId: evt.data.id,
						userName: evt.data.username,
						imageUrl: evt.data.image_url,
						updatedAt: Date.now(),
					};

					const user: any = await userModel.validate(update);

					await userModel.updateOne({ authId: evt.data.id }, user, {
						upsert: true,
					});

					console.log("User data updated!");
				} catch (error) {
					console.log(error);
				}
			}
			break;
		case "user.deleted":
			{
				await connectdb("Delete User");
				try {
					await userModel.deleteOne({ authId: evt.data.id });

					console.log("User data deleted!");
				} catch (error) {
					console.log(error);
				}
			}
			break;
	}

	return new Response("", { status: 200 });
}
