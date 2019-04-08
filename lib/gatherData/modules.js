/* eslint-disable import/no-dynamic-require, global-require */
const path = require("path");

const getModuleDescription = moduleName =>
  require(path.resolve(
    process.cwd(),
    "node_modules",
    moduleName,
    "package.json"
  )).description;

module.exports = (modules, usageData) => {
  return Object.entries(modules).reduce((acc, [name]) => {
    acc[name] = {
      description: getModuleDescription(name) || "",
      uses: usageData[name] || [],
    };
    return acc;
  }, {});
};
