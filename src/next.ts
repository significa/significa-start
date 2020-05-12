import path from 'path'

import execa from 'execa'

import addScript from './lib/addScript'
import log from './lib/log'
import copyDir from './lib/copyDir'

const scripts: { [key: string]: string } = {
  dev: 'next dev',
  build: 'next build',
  start: 'next start',
  'deploy:staging': 'serverless --stage=staging',
  'deploy:production': 'serverless --stage=production',
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
  '@serverless/core',
  '@serverless/template',
  'serverless',
  'serverless-next.js',
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

  log.step('Adding project files')
  await copyDir(`${path.join(__dirname, './templates/next')}`, cwd)

  log.step('Adding dependencies')
  await execa('npx', ['add-dependencies', '--save', ...dependencies], { cwd })
  await execa('npx', ['add-dependencies', '--save-dev', ...devDependencies], {
    cwd,
  })

  spinner.succeed()
}

export default next
