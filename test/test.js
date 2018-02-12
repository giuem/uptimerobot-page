import test from "ava";
import superkoa from "superkoa";
import cheerio from "cheerio";
import { mockSucc, mockFail } from "./mock";
import { createAPP } from "../src/bootstrap/app";
import { logger } from "../src/lib/logger";

logger.setLevel("ignore");

test.beforeEach(({ context }) => {
  context.app = createAPP();
});

test.serial("GET /", async t => {
  const scope = mockSucc();
  const res = await superkoa(t.context.app).get("/");
  // test status
  t.is(res.status, 200);
  // test UI
  const $ = cheerio.load(res.text);
  t.true($(".icon.icon-status-sum").hasClass("down"));
  t.is($(".summary-detail").text(), "2 systems are outage.");
  t.is($(".monitor").length, 4);
  scope.persist(false);
});

test.serial("GET / with error", async t => {
  const scope = mockFail();
  const res = await superkoa(t.context.app).get("/");
  t.is(res.status, 500);
  scope.persist(false);
});
