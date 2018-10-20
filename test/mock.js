import nock from "nock";

const custom_uptime_ranges = [
  ...Array(10).fill("0.000"),
  ...Array(10).fill("80.000"),
  ...Array(10).fill("99.999"),
  ...Array(15).fill("100.000")
].join("-");

export function mockSucc() {
  return nock("https://api.uptimerobot.com")
    .post("/v2/getMonitors")
    .reply(200, {
      stat: "ok",
      monitors: [
        {
          friendly_name: "Web/example1",
          status: 1,
          custom_uptime_ranges,
          custom_uptime_ratio: "100.000"
        },
        {
          friendly_name: "Web/example2",
          status: 2,
          custom_uptime_ranges,
          custom_uptime_ratio: "90.000"
        },
        {
          friendly_name: "Server/example1",
          status: 8,
          custom_uptime_ranges,
          custom_uptime_ratio: "0.000"
        },
        {
          friendly_name: "Server/example2",
          status: 9,
          custom_uptime_ranges,
          custom_uptime_ratio: "95.000"
        }
      ]
    });
}

export function mockFail() {
  return nock("https://api.uptimerobot.com")
    .persist()
    .post("/v2/getMonitors")
    .reply(502);
}
