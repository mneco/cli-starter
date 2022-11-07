import { MongoMemoryServer } from "mongodb-memory-server";
import { Mongoose } from "mongoose";

import runMongo from "@/helpers/mongo";
import runApp from "@/helpers/runApp";

describe("Sample test", () => {
	let mongoServer: MongoMemoryServer;
	let mongoose: Mongoose;

	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		mongoose = await runMongo(mongoServer.getUri());
		await runApp();
	});

	beforeEach(async () => {
		await mongoose.connection.db.dropDatabase();
	});

	afterAll(async () => {
		await mongoServer.stop();
	});

	it("should work", () => {
		expect(true).toBe(true);
	});
});
