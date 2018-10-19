"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uptimerobotApiv = _interopRequireDefault(require("uptimerobot-apiv2"));

var _memoryCache = require("memory-cache");

var _logger = require("../lib/logger");

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const distance = 45;

function lastDays(distance) {
  const now = (0, _dateFns.startOfDay)(new Date());
  const dates = [];
  const ranges = [];

  const getTime = date => Math.floor(date.getTime() / 1000);

  for (let i = -distance; i < 0; i++) {
    const day0 = (0, _dateFns.addDays)(now, i);
    const day1 = (0, _dateFns.addSeconds)((0, _dateFns.addDays)(day0, 1), -1);
    dates.push((0, _dateFns.format)(day0, "MMM Do, YYYY"));
    ranges.push(`${getTime(day0)}_${getTime(day1)}`);
  }

  return {
    dates,
    ranges: ranges.join("-")
  };
}

class UptimeRobotService {
  constructor(key) {
    this.api = new _uptimerobotApiv.default(key);
    this.cache = new _memoryCache.Cache();
  }

  async prefetchList() {
    let data = {
      sum: {
        // total: 0,
        down: 0,
        checktime: (0, _dateFns.format)(Date.now(), "MMMM Do YYYY, H:mm")
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
    const {
      dates,
      ranges
    } = lastDays(distance);
    const {
      monitors
    } = await this.api.getMonitors({
      custom_uptime_ratios: distance,
      custom_uptime_ranges: ranges
    });

    for (let monitor of monitors) {
      const [groupName, monitorName] = monitor["friendly_name"].split("/"); // init group

      if (!data.groups.hasOwnProperty(groupName)) {
        data.groups[groupName] = {
          down: 0,
          monitors: []
        };
      }
      /**
       * monitor status
       * 0,1 -> pause     -> black
       * 2   -> up        -> green
       * 8   -> seem down -> yellow
       * 9   -> down      -> red
       */


      const {
        status
      } = monitor; // calc down instances
      // data.sum.total++;

      if (status > 2) {
        data.sum.down++;
        data.groups[groupName].down++;
      } // last 30 days uptime


      const range = monitor["custom_uptime_ranges"].split("-");
      const uptime = [];

      for (let i = 0; i < range.length; i++) {
        uptime.push({
          date: dates[i],
          uptime: range[i]
        });
      } // push monitor


      data.groups[groupName].monitors.push({
        name: monitorName,
        status,
        totalUptime: monitor["custom_uptime_ratio"],
        uptime
      });
    } // cache monitors (update pre 5m)


    return this.cache.put("monitors", data);
  }

  async list() {
    let data = this.cache.get("monitors");

    if (!data) {
      data = await this.prefetchList();
    } else {
      _logger.logger.debug("Hit Cache");
    }

    return data;
  }

}

exports.default = UptimeRobotService;