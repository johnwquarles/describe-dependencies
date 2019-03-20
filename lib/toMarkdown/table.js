const groupBy = require("lodash/groupBy");
const sortBy = require("lodash/sortBy");
const markdownObject = require("./format");

module.exports = data =>
  Object.entries(data).reduce((acc, [dependencyKind, dependencies]) => {
    acc.push(markdownObject("heading", dependencyKind));

    const grouped = groupBy(
      Object.entries(dependencies).map(([name, { description, uses }]) => ({
        name,
        description,
        uses: uses.length,
      })),
      "uses"
    );

    const table = {
      table: {
        headers: ["Uses", "Name", "Description"],
        rows: [],
      },
    };

    Object.entries(grouped).forEach(([uses, deps]) => {
      table.table.rows.push(
        [uses, "", ""],
        ...sortBy(deps, "name").map(({ name, description }) => [
          "|",
          `**${name}**`,
          description,
        ])
      );
    });

    acc.push(table);

    return acc;
  }, []);
