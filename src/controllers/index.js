export const Index = async ctx => {
  await ctx.render("index", {
    title: process.env.APP_TITLE
    // monitors: await ctx.services.uptimerobot.list(),
    // cache: true
  });
};
