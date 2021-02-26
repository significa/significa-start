import path from 'path'

import execa from 'execa'

import log from './log'

async function gitInit(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Initializing git repository')
  await execa('rm', ['-rf', '.git'], { cwd })
  await execa('git', ['init'], { cwd })

  spinner.succeed()
}

async function gitCommit(name: string, message: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Committing dependencies')

  await execa('git', ['add', '.'], { cwd })
  await execa('git', ['commit', '-m', message, '--no-verify'], { cwd })

  spinner.succeed()
}

export { gitInit, gitCommit }
