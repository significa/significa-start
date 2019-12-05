import execa from 'execa'
import path from 'path'
import log from '../utils/log'

async function applyOverrides(name: string, type: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Overwritting necessary files')
  const baseDir = path.join(__dirname, '../overrides', type)
  const { stdout } = await execa('id', ['-u'])
  await execa('rsync', ['-a', '--update', `${baseDir}/`, cwd], {
    uid: parseInt(stdout, 10),
  })

  spinner.succeed()
}

export default applyOverrides
