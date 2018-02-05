export const Index = async ctx => {
  await ctx.render("index", {
    config: ctx.config,
    monitors: await ctx.services.uptimerobot.list()
  });
};
