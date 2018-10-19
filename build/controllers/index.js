"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Index = void 0;

const Index = async ctx => {
  await ctx.render("index", {
    config: ctx.config,
    data: await ctx.services.uptimerobot.list()
  });
};

exports.Index = Index;