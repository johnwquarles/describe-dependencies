/* eslint-disable import/no-dynamic-require, global-require */
const path = require("path");
const getUsageData = require("./usage");
const getModulesData = require("./modules");

const dependencyKinds = ["dependencies", "devDependencies", "peerDependencies"];

module.exports = () => {
  const packageJson = require(path.resolve(process.cwd(), "package.json"));
  return getUsageData().then(usageData =>
    Object.entries(packageJson)
      .filter(([key]) => dependencyKinds.includes(key))
      .reduce((acc, [kind, dependencies]) => {
        acc[kind] = getModulesData(dependencies, usageData);
        return acc;
      }, {})
  );
};
