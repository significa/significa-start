import path from 'path'

import execa from 'execa'

import addScript from './lib/addScript'
import log from './lib/log'
import copyDir from './lib/copyDir'

const scripts: { [key: string]: string } = {
  lint: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
  format: 'prettier "./src/**/*.+(ts|tsx|js|jsx|json|yml|yaml|md|mdx)"',
  'format:write': 'npm run prettier -- --write',
  'validate:format': 'npm run prettier -- --check',
  'validate:build': 'tsc',
  validate: 'npm run lint && npm run validate:format && npm run validate:build',
}

const devDependencies: string[] = [
  '@significa/eslint-config',
  '@significa/prettier-config',
  '@significa/tsconfig-config',
  //
  'eslint',
  'prettier',
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'husky',
  'lint-staged',
]

async function applyCommonConfig(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Adding scripts to package.json')
  Object.keys(scripts).forEach(async (key) => {
    await addScript(`${cwd}/package.json`, key, scripts[key])
  })

  log.step('Adding configuration files')
  await copyDir(`${path.join(__dirname, './templates/common')}`, cwd)

  log.step('Add common dependencies')

  await execa('npx', ['add-dependencies', '--save-dev', ...devDependencies], {
    cwd,
  })

  spinner.succeed()
}

export default applyCommonConfig
