import execa from 'execa'
import path from 'path'

import log from './log'

async function initGit(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Initializing git repository')
  await execa('rm', ['-rf', '.git'], { cwd })
  await execa('git', ['init'], { cwd })
  await execa('git', ['add', '.'], { cwd })
  await execa('git', ['commit', '-m', 'Initial files'], { cwd })

  spinner.succeed()
}

export default initGit
