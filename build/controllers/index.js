"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Index = exports.Index = async ctx => {
  await ctx.render("index", {
    config: ctx.config,
    data: await ctx.services.uptimerobot.list()
  });
};