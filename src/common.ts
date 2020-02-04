import execa from 'execa'
import path from 'path'

import addScript from './lib/addScript'
import log from './lib/log'
import copyDir from './lib/copyDir'

const scripts: { [key: string]: string } = {
  format: 'npm run prettier -- --write',
  lint: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
  prettier: 'prettier "./src/**/*.+(ts|tsx|js|jsx|json|yml|yaml|md|mdx)"',
  'validate:prettier': 'npm run prettier -- --check',
  'validate:ts': 'tsc',
  validate: 'npm run lint && npm run validate:prettier && npm run validate:ts',
}

const devDependencies: string[] = [
  '@significa/eslint-config',
  '@significa/prettier-config',
  '@significa/tsconfig-config',
  //
  'eslint',
  'prettier',
  'husky',
  'lint-staged',
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'cz-conventional-changelog',
]

async function applyCommonConfig(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Adding scripts to package.json')
  Object.keys(scripts).forEach(async key => {
    await addScript(`${cwd}/package.json`, key, scripts[key])
  })

  log.step('Adding configuration files')
  await copyDir(`${path.join(__dirname, '../templates/common')}`, cwd)

  log.step('Installing missing dependencies')
  await execa('npm', ['i', '--save-dev', ...devDependencies], { cwd })

  spinner.succeed()
}

export default applyCommonConfig