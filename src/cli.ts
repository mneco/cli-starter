import { program } from "commander";
import "module-alias/register";
import "source-map-support/register";

import runMongo from "@/helpers/mongo";
import runApp from "@/helpers/runApp";

program.name("cli-starter").description("TypeScript CLI starter").version("0.0.1");

program
	.command("run")
	.argument("<string>", "string to split")
	.option("--first", "display just the first substring")
	.option("-s, --separator <char>", "separator character", ",")
	.action(async (str: string, options: Record<string, unknown>) => {
		console.log("Argument", str);
		console.log("Options", options);

		console.log("Starting mongo");
		await runMongo();
		console.log("Mongo connected");
		await runApp();
	});

program.parse();
