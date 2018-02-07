"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = exports.router = new _koaRouter2.default();

router.get("/", _controllers.Index);