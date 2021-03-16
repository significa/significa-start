import path from 'path'

import execa from 'execa'

import addScript from './utils/addScript'
import log from './utils/log'
import copyDir from './utils/copyDir'

const scripts: { [key: string]: string } = {
  test: 'jest',
  lint: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
  format: 'prettier "./src/**/*.+(ts|tsx|js|jsx|json|yml|yaml|md|mdx)"',
  'format:write': 'npm run format -- --write',
  'validate:format': 'npm run format -- --check',
  'validate:build': 'tsc --noEmit',
  validate: 'npm run lint && npm run validate:format && npm run validate:build',
  postinstall: 'husky install',
}

const devDependencies: string[] = [
  '@significa/eslint-config',
  '@significa/prettier-config',
  '@significa/tsconfig-config',
  //
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'husky',
  'lint-staged',
  //
  'jest',
  '@types/jest',
]

async function common(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Adding scripts to package.json')
  Object.keys(scripts).forEach(async (key) => {
    await addScript(`${cwd}/package.json`, key, scripts[key])
  })

  log.step('Add common dependencies')

  await execa('npx', ['add-dependencies', '--save-dev', ...devDependencies], {
    cwd,
  })

  log.step('Adding configuration files')
  await copyDir(`${path.join(__dirname, './templates/common')}`, cwd)

  spinner.succeed()
}

export default common
