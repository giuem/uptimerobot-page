export const Index = async ctx => {
  await ctx.render("index", {
    monitors: await ctx.services.uptimerobot.list(),
    cache: true
  });
};
