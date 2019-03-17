/* eslint-disable import/no-dynamic-require, global-require */
const path = require("path");

const dependencyKinds = ["dependencies", "devDependencies", "peerDependencies"];

const getModuleDescription = moduleName =>
  require(path.resolve(
    process.cwd(),
    "node_modules",
    moduleName,
    "package.json"
  )).description;

const getModuleDescriptions = modules =>
  Object.entries(modules).reduce((acc, [name]) => {
    acc[name] = getModuleDescription(name);
    return acc;
  }, {});

module.exports = () => {
  const packageJson = require(path.resolve(process.cwd(), "package.json"));
  return Object.entries(packageJson)
    .filter(([key]) => dependencyKinds.includes(key))
    .reduce((acc, [kind, dependencies]) => {
      acc[kind] = getModuleDescriptions(dependencies);
      return acc;
    }, {});
};
