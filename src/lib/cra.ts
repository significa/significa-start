import execa from 'execa'
import path from 'path'

import log from '../utils/log'

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
  const { stdout } = await execa('id', ['-u'])
  await execa(
    'rsync',
    ['-a', '--update', `${path.join(__dirname, '../templates/cra')}/`, cwd],
    {
      uid: parseInt(stdout, 10),
    }
  )

  log.step('Installing dependencies')
  await execa('npm', ['i', '--save', ...dependencies], { cwd })
  await execa('npm', ['i', '--save-dev', ...devDependencies], { cwd })

  spinner.succeed()
}

export default cra
