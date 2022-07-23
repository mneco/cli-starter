import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Server } from "http";
import * as shutdown from "http-graceful-shutdown";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Mongoose } from "mongoose";
import * as request from "supertest";

import getGoogleUser from "@/helpers/getGoogleUser";
import runMongo from "@/helpers/mongo";
import runApp from "@/helpers/runApp";

jest.mock("@/helpers/getGoogleUser");

describe("Login endpoint", () => {
	const axiosMock = new MockAdapter(axios);

	let server: Server;
	let mongoServer: MongoMemoryServer;
	let mongoose: Mongoose;

	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		mongoose = await runMongo(await mongoServer.getUri());
		server = await runApp();
	});

	beforeEach(async () => {
		await mongoose.connection.db.dropDatabase();
	});

	afterAll(async () => {
		await shutdown(server);
		await mongoServer.stop();
		return new Promise<void>((resolve, reject) => {
			server.close(err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	});

	it("should return user for valid /google request", async () => {
		const testingGoogleMock = {
			name: "John Doe",
			email: "john@doe.com",
		};
		const accessTokenMock = "accessTokenMock";

		// axiosMock
		// 	.onGet(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessTokenMock}`)
		// 	.reply(200, testingGoogleMock);

		(getGoogleUser as jest.Mock).mockImplementation(() => Promise.resolve(testingGoogleMock));

		const response = await request(server).post("/login/google").send({ accessToken: accessTokenMock });
		expect(response.body.name).toBe(testingGoogleMock.name);
		expect(response.body.email).toBe(testingGoogleMock.email);
	});
});
