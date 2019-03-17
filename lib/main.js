const gatherData = require("./gatherData");
const renderers = require("./renderers");
const exporters = require("./exporters");

const documentFormat = "markdown"; // TODO: get this from command-line, make other options.
const exportFormat = "file"; // TODO: get this from command-line, make other options.

const fileName = "dependencies.md"; // TODO: get this from command-line

module.exports = () => {
  gatherData().then(data => {
    const renderedContent = renderers[documentFormat](data);
    exporters[exportFormat](fileName, renderedContent);
  });
};
