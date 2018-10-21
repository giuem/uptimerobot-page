import UptimeRobot from "uptimerobot-apiv2";
import { Cache } from "memory-cache";
import { logger } from "../lib/logger";
import { Parser } from "../lib/Parser";
import { format, addDays, addSeconds, startOfDay } from "date-fns";

const distance = 45;

function lastDays(distance) {
  const now = startOfDay(new Date());
  const dates = [];
  const ranges = [];
  const getTime = date => Math.floor(date.getTime() / 1000);
  for (let i = -distance; i < 0; i++) {
    const day0 = addDays(now, i);
    const day1 = addSeconds(addDays(day0, 1), -1);
    dates.push(format(day0, "MMM Do, YYYY"));
    ranges.push(`${getTime(day0)}_${getTime(day1)}`);
  }
  return { dates, ranges: ranges.join("-") };
}

export default class UptimeRobotService {
  constructor(key) {
    this.api = new UptimeRobot(key);
    this.cache = new Cache();
  }

  async prefetchList() {
    let data = {
      sum: {
        // total: 0,
        down: 0,
        checktime: format(Date.now(), "MMMM Do YYYY, H:mm")
      },
      groups: {
        /**
         * groupName: {
         *    index: undefined,
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
    const { dates, ranges } = lastDays(distance);
    const { monitors } = await this.api.getMonitors({
      custom_uptime_ratios: distance,
      custom_uptime_ranges: ranges
    });
    
    var isIndexed = false;
    for (let monitor of monitors) {
      let parser = new Parser(process.env.PAGE_NAMEFORMAT || "$group/$name");
      let result = parser.parse(monitor["friendly_name"]); 
      const groupName = result.group, monitorName = result.name;
      // init group
      if (!data.groups.hasOwnProperty(groupName)) {
        data.groups[groupName] = { index: undefined, down: 0, monitors: [] };
      }
  
      //Check manual index
      if (result.index){
        isIndexed = true;
        data.groups[groupName].index = result.index;
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
      // last 30 days uptime
      const range = monitor["custom_uptime_ranges"].split("-");
      const uptime = [];
      for (let i = 0; i < range.length; i++) {
        uptime.push({ date: dates[i], uptime: range[i] });
      }
      // push monitor
      data.groups[groupName].monitors.push({
        name: monitorName,
        status,
        totalUptime: monitor["custom_uptime_ratio"],
        uptime
      });
    }

    //Sort if indexed
    if (isIndexed){
      data.groups[groupName].sort(function(a, b){
        return a.index - b.index;
      })
    }
    // cache monitors (update pre 5m)
    return this.cache.put("monitors", data);
  }

  async list() {
    let data = this.cache.get("monitors");
    if (!data) {
      data = await this.prefetchList();
    } else {
      logger.debug("Hit Cache");
    }
    return data;
  }
}
