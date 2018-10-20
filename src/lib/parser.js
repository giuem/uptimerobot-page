const patterns = {
  name: ".+",
  group: ".+"
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
    this.fields = [];
    for (const pattern in patterns) {
      const index = rule.indexOf(pattern);
      if (index > -1) {
        this.fields.push({ key: pattern, index });
        rule = rule.replace(`$${pattern}`, `(${patterns[pattern]})`);
      }
    }
    this.fields.sort(function(a, b) {
      return a.index - b.index;
    });

    // init regex
    this.regex = new RegExp(rule);
  }

  parse(str) {
    const result = {};
    const matches = str.match(this.regex);
    this.fields.map(function({ key }, index) {
      result[key] = matches[index + 1];
    });
    return result;
  }
}
