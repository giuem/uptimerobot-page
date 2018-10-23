export function mountConfig(app) {
  const config = require("config");
  app.context.config = config;
  return config;
}
