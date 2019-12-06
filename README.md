<a href="https://significa.co"><img src="https://user-images.githubusercontent.com/4838076/70076649-20d29b00-15f7-11ea-9379-e2fa1889a525.png" alt="logo" width="300px"></a>

Opinionated Significa's bootstrap CLI to start ReactJS projects based on Create React App, NextJS or GatsbyJS.

`npx significa-start`

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/significa-start.svg)](https://npmjs.org/package/significa-start)
[![CircleCI](https://circleci.com/gh/significa/significa-start/tree/master.svg?style=shield)](https://circleci.com/gh/significa/significa-start/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/significa-start.svg)](https://npmjs.org/package/significa-start)
[![License](https://img.shields.io/npm/l/significa-start.svg)](https://github.com/significa/significa-start/blob/master/package.json)

## Usage

The command-line interface expects the following arguments:

- **Project type:** may be one of these options;

  - `cra`: Create React App from Facebook;
  - `next`: Next.js from Zeit;
  - `gatsby`: GatsbyJS;

- **Project name:** will be used on the folder name and configuration files;

Eg: `npx significa-start cra hello-world`.

## Commands

- Help: `significa-start --help`;
- Version: `significa-start --version`;

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

## License

[MIT](https://github.com/Significa/significa-start/blob/master/LICENSE)
