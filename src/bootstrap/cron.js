import { CronJob } from "cron";
import { logger } from "../lib/logger";
export default ctx => {
  const prefetchMonitors = new CronJob({
    cronTime: "*/5 * * * *",
    onTick: function() {
      ctx.services.uptimerobot
        .prefetchList()
        .then(() => {
          logger.debug("Prefetch done.");
        })
        .catch(err => logger.error(err));
    },
    onComplete: function() {
      logger.warn("Cron prefetchMonitors is stopped.");
    },
    start: true,
    runOnInit: true
  });

  logger.info("Cron job starts.");
};
