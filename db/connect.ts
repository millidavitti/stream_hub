import "server-only";
import mongoose from "mongoose";

export async function connectdb(event: string) {
	try {
		console.log("DB Connection Event: ", event);

		await mongoose.connect(process.env.MONGO_URI as string);

		mongoose.connection.readyState === 1 &&
			console.log("Connection successful!", mongoose.connection.readyState);
		mongoose.connection.readyState === 2 &&
			console.log("Connecting...", mongoose.connection.readyState);
	} catch (error) {
		console.log(error);
		await (async () => {
			await mongoose.disconnect();
			await connectdb(event);
		})();
	}
}
