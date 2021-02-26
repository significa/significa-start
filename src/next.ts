import path from 'path'

import execa from 'execa'

import addScript from './utils/addScript'
import log from './utils/log'
import copyDir from './utils/copyDir'

const scripts: { [key: string]: string } = {
  dev: 'next dev',
  build: 'next build',
  start: 'next start',
}

const dependencies: string[] = [
  'react',
  'react-dom',
  'next',
  'styled-components',
]

const devDependencies: string[] = [
  'typescript',
  '@types/react',
  '@types/react-dom',
  '@types/node',
  '@types/styled-components',
  '@svgr/webpack',
]

async function next(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Creating folder and initializing project')
  await execa('mkdir', [name])
  await execa('npm', ['init', '-y'], { cwd })

  log.step('Adding scripts to package.json')
  Object.keys(scripts).forEach(async (key) => {
    await addScript(`${cwd}/package.json`, key, scripts[key])
  })

  log.step('Adding dependencies')
  await execa('npx', ['add-dependencies', '--save', ...dependencies], { cwd })
  await execa('npx', ['add-dependencies', '--save-dev', ...devDependencies], {
    cwd,
  })

  spinner.succeed()
}

async function postNext(name: string) {
  const cwd = path.join(process.cwd(), name)

  log.step('Adding project files')
  await copyDir(`${path.join(__dirname, './templates/next')}`, cwd)
}

export { postNext }

export default next
