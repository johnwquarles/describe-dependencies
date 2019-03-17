const json2md = require("json2md");

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

const formatting = {
  heading: { tag: "h1", render: value => capitalize(value) },
  name: { tag: "h3", render: value => `**${value}**` },
  description: {
    tag: "p",
    render: value => `_${value || "No description provided"}_`,
  },
  usagesTotal: {
    tag: "p",
    render: usages => `Total usages detected: ${usages.length}`,
  },
  usages: {
    tag: "ul",
    render: usages => usages,
  },
};

const getMarkdownObject = (kind, value) => ({
  [formatting[kind].tag]: formatting[kind].render(value),
});

module.exports = data =>
  json2md(
    Object.entries(data).reduce((acc, [dependencyKind, dependencies]) => {
      acc.push(
        ...[getMarkdownObject("heading", dependencyKind)].concat(
          ...Object.entries(dependencies).map(
            ([name, { description, usages = [] }]) => {
              return [
                getMarkdownObject("name", name),
                getMarkdownObject("description", description),
                getMarkdownObject("usagesTotal", usages),
                getMarkdownObject("usages", usages),
              ];
            }
          )
        )
      );
      return acc;
    }, [])
  );
