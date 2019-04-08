const path = require("path");
const fs = require("fs");

module.exports = (fileName, content, filePath = process.cwd()) => {
  const outputPath = path.resolve(filePath, fileName);

  fs.writeFile(outputPath, content, err => {
    if (err) {
      process.stderr.write(`Error creating ${fileName}: ${err}\n`);
    } else {
      process.stdout.write(`Successfully created ${fileName}!\n`);
    }
  });
};
