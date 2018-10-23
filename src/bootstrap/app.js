import Koa from "koa";
import KoaViews from "koa-views";
import KoaError from "./error";
import { router } from "../routes";
import UptimeRobotService from "../services/uptimerobot";
import { join } from "path";
import { logger } from "../lib/logger";
import staticCache from "koa-static-cache";
import { mountConfig } from "./config";
import cron from "./cron";

export function createAPP() {
  const app = new Koa();

  // mount config to koa ctx
  const config = mountConfig(app);

  logger.setLevel(config.get("app.log_level"));

  app.use(KoaError);

  // mount service
  app.context.services = {
    uptimerobot: new UptimeRobotService(config.get("uptimerobot.api_key"))
  };

  // start cron
  cron(app.context);

  // views
  app.use(
    KoaViews(join(__dirname, "../views"), {
      extension: "pug"
    })
  );
  // static
  app.use(
    staticCache(join(__dirname, "../../build/public/"), {
      maxAge: process.env.NODE_ENV === "production" ? 365 * 24 * 60 * 60 : 0,
      gzip: true
    })
  );

  // routes
  app.use(router.routes());

  return app;
}

// start server
export function createServer(app, port) {
  if (!port) port = app.context.config.app.port;
  return app.listen(port, function() {
    logger.info("Server starts at", port);
  });
}
