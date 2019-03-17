/* eslint-disable import/no-dynamic-require, global-require */
const path = require("path");
const depcheck = require("depcheck");

const dependencyKinds = ["dependencies", "devDependencies", "peerDependencies"];

const getModuleDescription = moduleName =>
  require(path.resolve(
    process.cwd(),
    "node_modules",
    moduleName,
    "package.json"
  )).description;

const cleanUsagePath = usage =>
  usage
    .split(process.cwd())
    .join("")
    .slice(1);

const cleanUsageData = usageData => usageData.map(cleanUsagePath);

const getUsageData = () =>
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
    ({ using }) => using
  );

const getModuleData = (modules, usageData) =>
  Object.entries(modules).reduce((acc, [name]) => {
    acc[name] = {
      description: getModuleDescription(name),
      usages: cleanUsageData(usageData[name] || []),
    };
    return acc;
  }, {});

module.exports = () => {
  const packageJson = require(path.resolve(process.cwd(), "package.json"));
  return getUsageData().then(usageData =>
    Object.entries(packageJson)
      .filter(([key]) => dependencyKinds.includes(key))
      .reduce((acc, [kind, dependencies]) => {
        acc[kind] = getModuleData(dependencies, usageData);
        return acc;
      }, {})
  );
};
