import Koa from "koa";
import { config } from "dotenv";
import KoaViews from "koa-views";
import KoaError from "koa-error";
import { router } from "../routes";
import UptimeRobotService from "../services/uptimerobot";
import { join } from "path";
import { logger } from "../lib/logger";
import staticCache from "koa-static-cache";
import { mountConfig } from "./config";
import cron from "./cron";
config();

logger.setLevel(process.env.LOG_LEVEL);

export function createAPP() {
  const app = new Koa();

  // mount service
  app.context.services = {
    uptimerobot: new UptimeRobotService(process.env.UPTIME_ROBOT_API)
  };
  // mount config
  mountConfig(app);

  // start cron
  cron(app.context);

  // error
  app.use(
    KoaError({
      engine: "pug",
      template: join(__dirname, "../views/error.pug")
    })
  );

  // views
  app.use(
    KoaViews(join(__dirname, "../views"), {
      extension: "pug"
    })
  );
  // static
  app.use(
    staticCache(join(__dirname, "../../public/assets"), {
      maxAge: process.env.NODE_ENV === "production" ? 365 * 24 * 60 * 60 : 0,
      gzip: true
    })
  );

  // routes
  app.use(router.routes());

  return app;
}

// start server
const __port = process.env.PAGE_PORT || 3000;

export function createServer(app, port = __port) {
  return app.listen(port, function() {
    logger.info("Server starts at", port);
  });
}
