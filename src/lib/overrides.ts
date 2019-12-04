import execa from 'execa'
import path from 'path'

import { Stacks } from '../types'

async function applyOverrides(name: string, type: Stacks) {
  const cwd = path.join(process.cwd(), name)

  const baseDir = path.join(__dirname, '../overrides', type)
  const { stdout } = await execa('id', ['-u'])
  await execa('rsync', ['-a', '--update', `${baseDir}/`, cwd], {
    uid: parseInt(stdout, 10),
  })
}

export default applyOverrides
