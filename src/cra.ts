import execa from 'execa'
import path from 'path'

import log from './lib/log'
import copyDir from './lib/copyDir'

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

  log.step('Adding project files')
  await copyDir(`${path.join(__dirname, '../templates/cra')}`, cwd)

  log.step('Installing dependencies')
  await execa('npm', ['i', '--save', ...dependencies], { cwd })
  await execa('npm', ['i', '--save-dev', ...devDependencies], { cwd })

  spinner.succeed()
}

export default cra
