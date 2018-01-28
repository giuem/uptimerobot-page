import UptimeRobot from "uptimerobot-apiv2";
import { Cache } from "memory-cache";
import { logger } from "../lib/logger";

export default class UptimeRobotService {
  constructor(key) {
    this.api = new UptimeRobot(key);
    this.cache = new Cache();
  }

  async list() {
    let monitors = this.cache.get("monitors");
    if (!monitors) {
      const { monitors } = await this.api.getMonitors();
      // cache monitors for 5 mins
      this.cache.put("monitors", monitors, 5 * 60 * 1000);
    } else {
      logger.debug("Hit Cache");
    }
    return monitors;
  }
}
