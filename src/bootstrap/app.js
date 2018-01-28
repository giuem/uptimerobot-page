import Koa from "koa";
import { config } from "dotenv";
import KoaViews from "koa-views";
import { router } from "../routes";
import UptimeRobotService from "../services/uptimerobot";
import { join } from "path";
import { logger } from "../lib/logger";
config();
const app = new Koa();

// mount service
app.context.services = {
  uptimerobot: new UptimeRobotService(process.env.UPTIME_ROBOT_API)
};

// views
app.use(
  KoaViews(join(__dirname, "../views"), {
    extension: "pug"
  })
);

// routes
app.use(router.routes());

// start server
const port = process.env.APP_PORT || 3000;
app.listen(port, function() {
  logger.info("Server start at", port);
});
