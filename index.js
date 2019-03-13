#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const json2md = require("json2md");

const packageJson = require(path.resolve(process.cwd(), "package.json"));

const OUTPUT_FILE_NAME = "dependency-descriptions.md";
const FORMAT = "markdown";

const descriptions = Object.entries(packageJson)
  .filter(([key]) =>
    ["dependencies", "devDependencies", "peerDependencies"].includes(key)
  )
  .reduce((acc, [key, dependencies]) => {
    acc[key] = Object.entries(dependencies).reduce(
      (acc, [depPath, version]) => {
        acc[depPath] = require(path.resolve(
          process.cwd(),
          "node_modules",
          depPath,
          "package.json"
        )).description;
        return acc;
      },
      {}
    );
    return acc;
  }, {});

const adapters = {
  markdown: descriptions =>
    json2md(
      Object.entries(descriptions).reduce((acc, [key, dependencies]) => {
        acc.push(
          ...[{ h1: key }].concat(
            ...Object.entries(dependencies).map(([dep, description]) => [
              { p: `**${dep}**` },
              { p: `- _${description}_` }
            ])
          )
        );
        return acc;
      }, [])
    )
};

const output = adapters[FORMAT](descriptions);
fs.writeFile(path.resolve(process.cwd(), OUTPUT_FILE_NAME), output, () => {
  console.log(`successfully created ${OUTPUT_FILE_NAME}`);
});
