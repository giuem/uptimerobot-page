"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uptimerobotApiv = require("uptimerobot-apiv2");

var _uptimerobotApiv2 = _interopRequireDefault(_uptimerobotApiv);

var _memoryCache = require("memory-cache");

var _logger = require("../lib/logger");

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UptimeRobotService {
  constructor(key) {
    this.api = new _uptimerobotApiv2.default(key);
    this.cache = new _memoryCache.Cache();
  }

  async prefetchList() {
    let data = {
      sum: {
        // total: 0,
        down: 0,
        checktime: (0, _dateFns.format)(Date.now(), "YYYY-MM-DD HH:mm:ss")
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
    return this.cache.put("monitors", data, 5 * 60 * 1000);
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