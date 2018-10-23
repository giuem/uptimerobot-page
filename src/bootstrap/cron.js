import { CronJob } from "cron";
import { logger } from "../lib/logger";
export default ctx => {
  const prefetchMonitors = new CronJob({
    cronTime: ctx.config.get("app.crontime"),
    onTick: function() {
      ctx.services.uptimerobot
        .prefetchList()
        .then(() => {
          logger.debug(
            "Prefetch done. Next check at " + prefetchMonitors.nextDates()
          );
        })
        .catch(err => logger.error({ message: err.message, stack: err.stack }));
    },
    onComplete: function() {
      logger.warn("Cron prefetchMonitors is stopped.");
    },
    start: true,
    runOnInit: true
  });

  logger.info("Cron job starts.");
};
