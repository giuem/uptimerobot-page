"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountConfig = mountConfig;
const LINKS = Symbol("config#links");
const env = process.env;

function mountConfig(app) {
  const config = {
    title: env.PAGE_TITLE || "",
    copyright: env.PAGE_COPYRIGHT || "",

    get links() {
      if (typeof this[LINKS] === "undefined") {
        if (!env.PAGE_LINKS) {
          this[LINKS] = "";
        } else {
          this[LINKS] = [];
          for (let link of env.PAGE_LINKS.split(",,")) {
            const l = link.split("|");
            this[LINKS].push({
              name: l[0].trim(),
              href: l[1].trim()
            });
          }
        }
      }
      return this[LINKS];
    }
  };

  app.context.config = config;
}