const json2md = require("json2md");

const formatting = {
  heading: { tag: "h1", render: value => value },
  dependencyName: { tag: "p", render: value => `**${value}**` },
  dependencyDescription: { tag: "p", render: value => `- _${value}_` },
};

const getMarkdownObject = (kind, value) => ({
  [formatting[kind].tag]: formatting[kind].render(value),
});

module.exports = data =>
  json2md(
    Object.entries(data).reduce((acc, [dependencyKind, dependencies]) => {
      acc.push(
        ...[getMarkdownObject("heading", dependencyKind)].concat(
          ...Object.entries(dependencies).map(([name, description]) => {
            return [
              getMarkdownObject("dependencyName", name),
              getMarkdownObject("dependencyDescription", description),
            ];
          })
        )
      );
      return acc;
    }, [])
  );
