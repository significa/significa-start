import execa from 'execa'
import path from 'path'
import tmp from 'tmp'

import log from '../utils/log'
import installMissingDeps from '../utils/installMissingDeps'

async function addSrc(name: string, repo: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Cloning repository')
  const { name: tmpPath, removeCallback: cleanup } = tmp.dirSync()
  await execa('git', ['clone', repo, tmpPath], { cwd: tmpPath })

  log.step('Copying files')
  const { stdout } = await execa('id', ['-u'])
  await execa('rsync', ['-a', '--update', `${tmpPath}/src/`, `${cwd}/src`], {
    uid: parseInt(stdout, 10),
  })

  log.step('Installing missing dependencies')
  await installMissingDeps(tmpPath, cwd)

  cleanup()

  spinner.succeed()
}

export default addSrc
