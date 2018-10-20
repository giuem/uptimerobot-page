import { logger } from "../lib/logger";

export default async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    const body = {
      message: err.message,
      stack: process.env.NODE_ENV !== "production" ? err.stack : null
    };
    logger.error(body);
    ctx.body = body;
  }
}
