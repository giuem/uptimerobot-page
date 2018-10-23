export const Index = async ctx => {
  await ctx.render("index", {
    config: ctx.config.get("website"),
    data: await ctx.services.uptimerobot.list()
  });
};
