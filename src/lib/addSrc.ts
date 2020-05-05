import path from 'path'

import execa from 'execa'
import tmp from 'tmp'

import log from './log'
import installMissingDeps from './installMissingDeps'
import copyDir from './copyDir'

async function addSrc(name: string, repo: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Cloning repository')
  const { name: tmpPath, removeCallback: cleanup } = tmp.dirSync()
  await execa('git', ['clone', repo, tmpPath], { cwd: tmpPath })

  log.step('Copying files')
  await copyDir(`${tmpPath}/src`, `${cwd}/src`)

  log.step('Installing missing dependencies')
  await installMissingDeps(tmpPath, cwd)

  cleanup()

  spinner.succeed()
}

export default addSrc
