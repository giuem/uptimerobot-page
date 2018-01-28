import KoaRouter from "koa-router";
import { Index } from "../controllers";

export const router = new KoaRouter();

router.get("/", Index);
