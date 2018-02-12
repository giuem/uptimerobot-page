import test from "ava";
import superkoa from "superkoa";
import cheerio from "cheerio";
import { mock } from "./mock";
import { app } from "../src/bootstrap/app";

test.before("start server", _ => {
  mock();
});

test.serial("GET /", async t => {
  const res = await superkoa(app).get("/");
  // test status
  t.is(res.status, 200);
  // test UI
  const $ = cheerio.load(res.text);
  t.true($(".icon.icon-status-sum").hasClass("down"));
  t.is($(".summary-detail").text(), "2 systems are outage.");
  t.is($(".monitor").length, 4);
});
