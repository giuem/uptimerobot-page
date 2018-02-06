import UptimeRobot from "uptimerobot-apiv2";
import { Cache } from "memory-cache";
import { logger } from "../lib/logger";
import { format } from "date-fns";

export default class UptimeRobotService {
  constructor(key) {
    this.api = new UptimeRobot(key);
    this.cache = new Cache();
  }

  async list() {
    let data = this.cache.get("monitors");
    if (!data) {
      data = {
        sum: {
          // total: 0,
          down: 0,
          checktime: format(Date.now(), "YYYY-MM-DD HH:mm:ss")
        },
        groups: {
          /**
           * groupName: {
           *    down: 0,
           *    monitors: [{
           *      name,
           *      status
           *    }]
           * }
           *
           */
        }
      };

      const { monitors } = await this.api.getMonitors();
      for (let monitor of monitors) {
        const [groupName, monitorName] = monitor["friendly_name"].split("/");
        // init group
        if (!data.groups.hasOwnProperty(groupName)) {
          data.groups[groupName] = { down: 0, monitors: [] };
        }

        /**
         * monitor status
         * 0,1 -> pause     -> black
         * 2   -> up        -> green
         * 8   -> seem down -> yellow
         * 9   -> down      -> red
         */
        const { status } = monitor;
        // calc down instances
        // data.sum.total++;
        if (status > 2) {
          data.sum.down++;
          data.groups[groupName].down++;
        }
        // push monitor
        data.groups[groupName].monitors.push({
          name: monitorName,
          status
        });
      }
      // cache monitors for 5 mins
      this.cache.put("monitors", data, 5 * 60 * 1000);
    } else {
      logger.debug("Hit Cache");
    }
    return data;
  }
}
