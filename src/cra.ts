import path from 'path'

import execa from 'execa'

import log from './utils/log'
import copyDir from './utils/copyDir'

const dependencies: string[] = ['styled-components']
const devDependencies: string[] = ['@types/styled-components']

async function cra(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Installing create react app')
  await execa('npx', [
    'create-react-app',
    name,
    '--template',
    'typescript',
    '--use-npm',
  ])

  log.step('Removing src folder')
  await execa('rm', ['-rf', 'src'], { cwd })

  log.step('Installing dependencies')
  await execa('npx', ['add-dependencies', '--save', ...dependencies], { cwd })
  await execa('npx', ['add-dependencies', '--save-dev', ...devDependencies], {
    cwd,
  })

  spinner.succeed()
}

async function postCra(name: string) {
  const cwd = path.join(process.cwd(), name)

  log.step('Adding project files')
  await copyDir(`${path.join(__dirname, './templates/cra')}`, cwd)
}

export { postCra }

export default cra
