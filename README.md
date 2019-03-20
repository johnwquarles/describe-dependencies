# Describe-Dependencies

### What is this?
- A simple Node executable that will produce a markdown file (`dependencies.md`) describing your project's npm dependencies. You'll get a table listing every dependency by number of uses, ascending, and a list of each dependency showing where those uses occur.

Please see this project's own `dependencies.md` file for an example.

### How do I use it?
- Install to your project with `npm install --save-dev describe-dependencies` or `yarn add --dev describe-dependencies`.
- Then use `npx describe-dependencies` to execute.

### Current limitations, TODOs
- Dependencies only used within `package.json` (husky, for example) are not detected.
- Speed up execution.
- Pass in desired filename, sorting preferences via cli.
