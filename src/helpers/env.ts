import * as dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import { resolve } from "path";
import { cwd } from "process";

dotenv.config({ path: resolve(cwd(), ".env") });

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
	MONGO: str(),
});
