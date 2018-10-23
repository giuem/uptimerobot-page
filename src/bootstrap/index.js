import { config as dotenv } from "dotenv";
import { createAPP, createServer } from "./app";
// load .env at the very beginning
dotenv();

const app = createAPP();
createServer(app);
