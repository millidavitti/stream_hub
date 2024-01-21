import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import UserSchema from "@/db/models/user.schema";
import { connectdb } from "@/db/connect";

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
				await connectdb("Create User");
				const user = new UserSchema({
					authId: evt.data.id,
					userName: evt.data.username,
					imageUrl: evt.data.image_url,
				});

				const validate = user.validateSync();

				if (validate?.errors) throw new Error(validate.errors);

				await UserSchema.create(user);

				console.log("New user created!");
			}
			break;
		case "user.updated":
			{
				await connectdb("Update User");
				const update = {
					authId: evt.data.id,
					userName: evt.data.username,
					imageUrl: evt.data.image_url,
					updatedAt: Date.now(),
				};

				const user: any = await UserSchema.validate(update);

				await UserSchema.updateOne({ authId: evt.data.id }, user, {
					upsert: true,
				});

				console.log("User data updated!");
			}
			break;
		case "user.deleted":
			{
				await connectdb("Delete User");
				await UserSchema.deleteOne({ authId: evt.data.id });

				console.log("User data deleted!");
			}
			break;
	}

	return new Response("", { status: 200 });
}
