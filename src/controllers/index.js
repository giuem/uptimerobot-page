export const Index = async ctx => {
  await ctx.render("index", {
    config: ctx.config,
    data: await ctx.services.uptimerobot.list()
  });
};
