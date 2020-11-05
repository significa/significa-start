<a href="https://significa.co"><img src="https://user-images.githubusercontent.com/4838076/70076649-20d29b00-15f7-11ea-9379-e2fa1889a525.png" alt="logo" width="300px"></a>

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@significa/start.svg)](https://npmjs.org/package/significa/start)
[![Downloads/week](https://img.shields.io/npm/dw/@significa/start.svg)](https://npmjs.org/package/@significa/start)
[![License](https://img.shields.io/npm/l/@significa/start.svg)](https://github.com/significa/significa-start/blob/master/package.json)

Opinionated Significa's bootstrap CLI to start ReactJS projects based on Create React App, NextJS or GatsbyJS.

`npx @significa/start`

![significa-significa-start](https://user-images.githubusercontent.com/4838076/88907578-b25edf00-d250-11ea-92c8-3e9845e08660.png)

You can also skip the prompt and give it the configuration you want:

- **Project type:** may be one of these options;
  - `cra`: Create React App from Facebook;
  - `next`: Next.js from Zeit;
  - `gatsby`: GatsbyJS;
- **Project name:** will be used on the folder name and configuration files;

Eg: `npx @significa/start cra hello-world`.

## Commands

- Regular: `npx @significa/start`;
- Shortcut: `npx @significa/start [project] [name]`;
- Help: `npx @significa/start --help`;
- Version: `npx @significa/start --version`;

## Common dependencies:

- Typescript;
- Styled-components;
- Commitlint;
- Lint-staged;
- [@significa/eslint-config](https://github.com/Significa/significa-style/tree/master/packages/eslint-config);
- [@significa/prettier-config](https://github.com/Significa/significa-style/tree/master/packages/prettier-config);
- [@significa/tsconfig-config](https://github.com/Significa/significa-style/tree/master/packages/tsconfig-config);
- [Significa-src](https://github.com/Significa/significa-src);
- [Significa-ui](https://github.com/Significa/significa-ui);

## Running locally

Run `npm link` in the directory.
Use the CLI as `significa-start` anywhere.

## License

[MIT](https://github.com/Significa/significa-start/blob/master/LICENSE)

[![Significa footer](https://user-images.githubusercontent.com/17513388/71971185-fc736b00-3201-11ea-9678-090b6b6a0b3f.png)](https://significa.co)
