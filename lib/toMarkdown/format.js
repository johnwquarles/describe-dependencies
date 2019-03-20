const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

const formatting = {
  heading: { tag: "h1", render: value => capitalize(value) },
  name: { tag: "h3", render: value => `**${value}**` },
  description: {
    tag: "p",
    render: value => `_${value || "No description provided"}_`,
  },
  usesTotal: {
    tag: "p",
    render: uses =>
      `${uses.length} use${uses.length === 1 ? "" : "s"} detected`,
  },
  uses: {
    tag: "ul",
    render: uses => uses,
  },
};

module.exports = (kind, value) => ({
  [formatting[kind].tag]: formatting[kind].render(value),
});
