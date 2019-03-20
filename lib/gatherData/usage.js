const depcheck = require("depcheck");

const cleanUsagePath = usage =>
  usage
    .split(process.cwd())
    .join("")
    .slice(1);

const cleanUsageData = using =>
  Object.entries(using).reduce((acc, [name, uses]) => {
    acc[name] = uses.map(use => cleanUsagePath(use));
    return acc;
  }, {});

module.exports = () =>
  depcheck(
    process.cwd(),
    {
      skipMissing: true,
      ignoreDirs: ["node_modules", "bower_components", "build", "dist"],
      detectors: [
        depcheck.detector.requireCallExpression,
        depcheck.detector.importDeclaration,
      ],
      parsers: {
        "*.js": depcheck.parser.es6,
        "*.jsx": depcheck.parser.jsx,
      },
      specials: [depcheck.special.eslint, depcheck.special.webpack],
    },
    ({ using }) => cleanUsageData(using)
  );
