import path from 'path'

import execa from 'execa'

import addScript from './utils/addScript'
import copyDir from './utils/copyDir'
import log from './utils/log'

const scripts: { [key: string]: string } = {
  build: 'gatsby build',
  develop: 'gatsby develop --host 0.0.0.0',
  dev: 'npm run develop',
  start: 'npm run develop',
  deploy: 'gatsby-plugin-s3 deploy --yes',
}

const dependencies: string[] = [
  'react',
  'react-dom',
  'gatsby',
  // typescript
  'gatsby-plugin-typescript',
  // needed
  'react-helmet',
  'gatsby-image',
]

const devDependencies: string[] = [
  'typescript',
  '@types/react',
  '@svgr/webpack',
  'tsconfig-paths-webpack-plugin',
  'gatsby-plugin-s3',
  'gatsby-plugin-react-helmet',
  'gatsby-source-filesystem',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-manifest',
]

async function gatsby(name: string) {
  const cwd = path.join(process.cwd(), name)

  const spinner = log.step('Creating folder and initializing project')
  await execa('mkdir', [name])
  await execa('npm', ['init', '-y'], { cwd })

  log.step('Adding scripts to package.json')
  Object.keys(scripts).forEach(async (key) => {
    await addScript(`${cwd}/package.json`, key, scripts[key])
  })

  log.step('Installing dependencies')
  await execa('npx', ['add-dependencies', '--save', ...dependencies], { cwd })
  await execa('npx', ['add-dependencies', '--save-dev', ...devDependencies], {
    cwd,
  })

  spinner.succeed()
}

async function postGatsby(name: string) {
  const cwd = path.join(process.cwd(), name)

  log.step('Adding project files')
  await copyDir(`${path.join(__dirname, './templates/gatsby')}`, cwd)
}

export { postGatsby }

export default gatsby
