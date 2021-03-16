import path from 'path'

import execa from 'execa'

import log from './utils/log'
import copyDir from './utils/copyDir'

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

  spinner.succeed()
}

async function postCra(name: string) {
  const cwd = path.join(process.cwd(), name)

  log.step('Adding project files')
  await copyDir(`${path.join(__dirname, './templates/cra')}`, cwd)
}

export { postCra }

export default cra
