const patterns = {
  name: "(?<name>.+)",
  group: "(?<group>.+)",
  index: "(?<index>\d+)?"
};
/**
 * parse monitor name
 *
 * @export
 * @class Parser
 */
export class Parser {
  /**
   * Creates an instance of Parser.
   * @param {*} rule syntax: $keyword1 $keyword2...
   * @memberof Parser
   */
  constructor(rule) {
    // parse rule
    for (const pattern in patterns) {
      const index = rule.indexOf(pattern);
      if (index > -1) {
        rule = rule.replace(`$${pattern}`, `(${patterns[pattern]})`);
      }
    }

    // init regex
    this.regex = new RegExp(rule);
  }

  parse(str) {
    const matches = str.match(this.regex).groups;
    if (matches.index) matches.index = parseInt(matches.index);
    return matches;
  }
}
