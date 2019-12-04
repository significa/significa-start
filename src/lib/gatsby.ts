import Listr from 'listr'
import execa from 'execa'
import path from 'path'
const copy = require('copy-template-dir')

import addScript from '../utils/add-script'

const scripts: { [key: string]: string } = {
  build: 'gatsby build',
  develop: 'gatsby develop --host 0.0.0.0',
  dev: 'npm run develop',
  start: 'npm run develop',
}

const dependencies: string[] = [
  'react',
  'react-dom',
  'gatsby',
  // style
  'styled-components',
  // typescript
  'gatsby-plugin-typescript',
  // needed
  'react-helmet',
  'gatsby-image',
  'gatsby-plugin-react-helmet',
  'gatsby-source-filesystem',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-manifest',
]

const devDependencies: string[] = [
  'typescript',
  'prettier',
  '@types/react',
  '@types/react-dom',
  '@types/styled-components',
]

async function createGatsby(name: string) {
  const cwd = path.join(process.cwd(), name)

  return new Listr([
    {
      title: 'Creating folder and initializing project',
      task: async () => {
        await execa('mkdir', [name])
        await execa('npm', ['init', '-y'], { cwd })
      },
    },
    {
      title: 'Adding scripts to package.json',
      task: async () => {
        Object.keys(scripts).forEach(async key => {
          await addScript(`${cwd}/package.json`, key, scripts[key])
        })
      },
    },
    {
      title: 'Add project files',
      task: async () => {
        copy(
          path.join(__dirname, '../templates/gatsby'),
          cwd,
          { name },
          (err: any) => {
            if (err) throw err
          }
        )
      },
    },
    {
      title: 'Installing dependencies',
      task: async () => {
        await execa('npm', ['i', '--save', ...dependencies], { cwd })
        await execa('npm', ['i', '--save-dev', ...devDependencies], { cwd })
      },
    },
  ])
}

export default createGatsby
