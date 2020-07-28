import path from 'path'

import execa from 'execa'

import log from './log'

async function commit(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Committing dependencies')

  await execa('git', ['add', '.'], { cwd })
  await execa(
    'git',
    ['commit', '-m', 'build(npm): adds dependencies to package.json'],
    { cwd }
  )

  spinner.succeed()
}

export default commit
