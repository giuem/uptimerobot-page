"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cron = require("cron");

var _logger = require("../lib/logger");

exports.default = ctx => {
  const prefetchMonitors = new _cron.CronJob({
    cronTime: "*/5 * * * *",
    onTick: function () {
      ctx.services.uptimerobot.prefetchList().then(() => {
        _logger.logger.debug("Prefetch done.");
      }).catch(err => _logger.logger.error(err.message, err.stack));
    },
    onComplete: function () {
      _logger.logger.warn("Cron prefetchMonitors is stopped.");
    },
    start: true,
    runOnInit: true
  });

  _logger.logger.info("Cron job starts.");
};