import test from "ava";
import { Parser } from "../parser";

test("parse $name/$group", t => {
  let parser = new Parser("$name/$group");
  let result = parser.parse("aaa/bbb");
  t.is(result.name, "aaa");
  t.is(result.group, "bbb");
});

test("parse $group/$name", t => {
  const parser = new Parser("$group/$name");
  let result = parser.parse("aaa/bbb");
  t.is(result.name, "bbb");
  t.is(result.group, "aaa");
});

test("parse $name", t => {
  const parser = new Parser("$name");
  let result = parser.parse("aaa");
  t.is(result.name, "aaa");
  t.is(result.group, undefined);
});
