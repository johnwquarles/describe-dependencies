const json2md = require("json2md");
const makeTable = require("./table");
const makeList = require("./list");

module.exports = data => json2md([...makeTable(data), ...makeList(data)]);
