import execa from 'execa'

async function copyDir(source: string, target: string) {
  return execa('cp', ['-r', `${source}/`, target])
}

export default copyDir
