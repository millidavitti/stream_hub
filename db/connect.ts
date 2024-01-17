import "server-only";
import mongoose from "mongoose";

export async function connectdb() {
	const data = mongoose.connection.on("connected", () =>
		console.log("Connected Already"),
	);

	if (data.readyState === 1) return;
	console.log("Connection Start...", mongoose.connection.readyState);
	try {
		const data = await mongoose.connect(process.env.MONGO_URI as string);
		console.log("Connection successful!", data.connection.readyState);
	} catch (error) {
		console.log(`Connection error!
  1. Check your internet connection.
  2. Make sure you have provided your database connection URI and it is correct.
  3. Make sure your database URI has the correct password.
  4. Make sure your IP is authorised
  
  Try again!
  `);
	}
}
