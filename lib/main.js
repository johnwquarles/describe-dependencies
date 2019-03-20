const gatherData = require("./gatherData");
const toMarkdown = require("./toMarkdown");
const writeFile = require("./writeFile");

const fileName = "dependencies.md"; // TODO: get this from cli

module.exports = () => {
  gatherData().then(data => {
    const renderedContent = toMarkdown(data);
    writeFile(fileName, renderedContent);
  });
};
