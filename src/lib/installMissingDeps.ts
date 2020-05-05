import path from 'path'

import execa from 'execa'
import jsonfile from 'jsonfile'

type Deps = { [key: string]: string }

function getMissingDeps(oldDeps: Deps, newDeps: Deps): string[] {
  return Object.keys(newDeps).reduce((acc: string[], dep: string) => {
    if (!oldDeps[dep]) {
      acc.push(dep)
    }

    return acc
  }, [])
}

async function installMissingDeps(
  sourcePath: string,
  targetPath: string,
  includeDevDeps?: boolean
) {
  const newPackage = await jsonfile.readFileSync(
    path.join(sourcePath, 'package.json')
  )
  const oldPackage = await jsonfile.readFileSync(
    path.join(targetPath, 'package.json')
  )
  const dependencies = getMissingDeps(
    oldPackage.dependencies || {},
    newPackage.dependencies || {}
  )

  if (dependencies.length > 0) {
    await execa('npm', ['i', '--save', ...dependencies], { cwd: targetPath })
  }

  if (includeDevDeps) {
    const devDependencies = getMissingDeps(
      oldPackage.devDependencies || {},
      newPackage.devDependencies || {}
    )

    if (devDependencies.length > 0) {
      await execa('npm', ['i', '--save-dev', ...devDependencies], {
        cwd: targetPath,
      })
    }
  }
}

export default installMissingDeps
