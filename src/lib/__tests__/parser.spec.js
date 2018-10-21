import test from "ava";
import { Parser } from "../parser";

test("parse $name/$group/$index", t => {
  let parser = new Parser("$name/$group/$index");
  let result = parser.parse("aaa/bbb/1");
  t.is(result.name, "aaa");
  t.is(result.group, "bbb");
  t.is(result.index, 1);
});

test("parse $group/$index/$name", t => {
  let parser = new Parser("$group/$index/$name");
  let result = parser.parse("aaa/10/bbb");
  t.is(result.name, "bbb");
  t.is(result.group, "aaa");
  t.is(result.index, 10);
});

test("parse $name/$group/$index when index is omitted", t => {
  let parser = new Parser("$name/$group/$index");
  let result = parser.parse("aaa/bbb/");
  t.is(result.name, "aaa");
  t.is(result.group, "bbb");
  t.is(result.index, undefined);
});

test("parse $group/$index/$name when index is omitted", t => {
  let parser = new Parser("$group/$index/$name");
  let result = parser.parse("aaa//bbb");
  t.is(result.name, "bbb");
  t.is(result.group, "aaa");
  t.is(result.index, undefined);
});

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
