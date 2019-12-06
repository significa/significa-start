import path from 'path'
import log from '../utils/log'
import copyDir from '../utils/copyDir'

async function overrides(name: string, type: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Overwritting necessary files')
  const baseDir = path.join(__dirname, '../overrides', type)
  await copyDir(baseDir, cwd)

  spinner.succeed()
}

export default overrides
