"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAPP = createAPP;
exports.createServer = createServer;

var _koa = _interopRequireDefault(require("koa"));

var _dotenv = require("dotenv");

var _koaViews = _interopRequireDefault(require("koa-views"));

var _koaError = _interopRequireDefault(require("koa-error"));

var _routes = require("../routes");

var _uptimerobot = _interopRequireDefault(require("../services/uptimerobot"));

var _path = require("path");

var _logger = require("../lib/logger");

var _koaStaticCache = _interopRequireDefault(require("koa-static-cache"));

var _config = require("./config");

var _cron = _interopRequireDefault(require("./cron"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

_logger.logger.setLevel(process.env.LOG_LEVEL);

function createAPP() {
  const app = new _koa.default(); // mount service

  app.context.services = {
    uptimerobot: new _uptimerobot.default(process.env.UPTIME_ROBOT_API)
  }; // mount config

  (0, _config.mountConfig)(app); // start cron

  (0, _cron.default)(app.context); // error

  app.use((0, _koaError.default)({
    engine: "pug",
    template: (0, _path.join)(__dirname, "../views/error.pug")
  })); // views

  app.use((0, _koaViews.default)((0, _path.join)(__dirname, "../views"), {
    extension: "pug"
  })); // static

  app.use((0, _koaStaticCache.default)((0, _path.join)(__dirname, "../../build/public/"), {
    maxAge: process.env.NODE_ENV === "production" ? 365 * 24 * 60 * 60 : 0,
    gzip: true
  })); // routes

  app.use(_routes.router.routes());
  return app;
} // start server


const __port = process.env.PAGE_PORT || 3000;

function createServer(app, port = __port) {
  return app.listen(port, function () {
    _logger.logger.info("Server starts at", port);
  });
}