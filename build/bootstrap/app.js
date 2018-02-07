"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _dotenv = require("dotenv");

var _koaViews = require("koa-views");

var _koaViews2 = _interopRequireDefault(_koaViews);

var _routes = require("../routes");

var _uptimerobot = require("../services/uptimerobot");

var _uptimerobot2 = _interopRequireDefault(_uptimerobot);

var _path = require("path");

var _logger = require("../lib/logger");

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _config = require("./config");

var _cron = require("./cron");

var _cron2 = _interopRequireDefault(_cron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

_logger.logger.setLevel(process.env.LOG_LEVEL);

const app = new _koa2.default();

// mount service
app.context.services = {
  uptimerobot: new _uptimerobot2.default(process.env.UPTIME_ROBOT_API)
};
// mount config
(0, _config.mountConfig)(app);

// start cron
(0, _cron2.default)(app.context);

// views
app.use((0, _koaViews2.default)((0, _path.join)(__dirname, "../../public/views"), {
  extension: "pug"
}));
// static
app.use((0, _koaStatic2.default)((0, _path.join)(__dirname, "../../public/assets")));

// routes
app.use(_routes.router.routes());

// start server
const port = process.env.PAGE_PORT || 3000;
app.listen(port, function () {
  _logger.logger.info("Server starts at", port);
});