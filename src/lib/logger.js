import { Map } from "immutable";
import { format } from "date-fns";

const LEVEL = Map({
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
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
      console.log("[DEBUG]", time(), ...msgs);
  }

  info(...msgs) {
    if (LEVEL.get("info") >= this.level)
      console.log("[INFO ]", time(), ...msgs);
  }

  warn(...msgs) {
    if (LEVEL.get("warn") >= this.level)
      console.log("[WARN ]", time(), ...msgs);
  }

  error(...msgs) {
    if (LEVEL.get("error") >= this.level)
      console.log("[ERROR]", time(), ...msgs);
  }
}

export const logger = new Logger();
