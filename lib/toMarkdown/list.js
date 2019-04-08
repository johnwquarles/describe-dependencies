const markdownObject = require("./format");

module.exports = data =>
  Object.entries(data).reduce((acc, [dependencyKind, dependencies]) => {
    acc.push(
      ...[markdownObject("heading", dependencyKind)].concat(
        ...Object.entries(dependencies).map(([name, { description, uses }]) => {
          return [
            markdownObject("name", name),
            markdownObject("description", description),
            markdownObject("usesTotal", uses),
            markdownObject("uses", uses),
          ];
        })
      )
    );
    return acc;
  }, []);
