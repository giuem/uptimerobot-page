import { Map } from "immutable";
import { format } from "date-fns";

const LEVEL = Map({
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  ignore: 4
});

const time = () => format(Date.now(), "YYYY/MM/DD HH:mm:ss");

class Logger {
  constructor(level = "debug") {
    this.setLevel(level);
  }

  setLevel(level) {
    this.level = LEVEL.get(level) || 0;
  }

  debug(...msgs) {
    if (LEVEL.get("debug") >= this.level)
      console.log(time(), "[DEBUG]", ...msgs);
  }

  info(...msgs) {
    if (LEVEL.get("info") >= this.level)
      console.log(time(), "[INFO ]", ...msgs);
  }

  warn(...msgs) {
    if (LEVEL.get("warn") >= this.level)
      console.log(time(), "[WARN ]", ...msgs);
  }

  error(...msgs) {
    if (LEVEL.get("error") >= this.level)
      console.log(time(), "[ERROR]", ...msgs);
  }
}

export const logger = new Logger();
