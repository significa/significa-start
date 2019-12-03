import Listr from 'listr'
import execa from 'execa'
import path from 'path'
const copy = require('copy-template-dir')

import addScript from '../../utils/add-script'

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
      title: 'Installing dependencies',
      task: async () => {
        await execa(
          'npm',
          [
            'install',
            '--save',
            // main
            'react',
            'react-dom',
            'gatsby',
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
            // style
            'styled-components',
          ],
          { cwd }
        )
        await execa(
          'npm',
          ['install', '--save-dev', 'typescript', 'prettier'],
          {
            cwd,
          }
        )
      },
    },
    {
      title: 'Adding scripts to package.json',
      task: async () => {
        await addScript(`${cwd}/package.json`, 'build', 'gastby build')
        await addScript(
          `${cwd}/package.json`,
          'develop',
          'gatsby develop --host 0.0.0.0'
        )
        await addScript(`${cwd}/package.json`, 'dev', 'npm run develop')
        await addScript(`${cwd}/package.json`, 'start', 'npm run develop')
      },
    },
    {
      title: 'Add project files',
      task: async () => {
        copy(path.join(__dirname, 'template'), cwd, { name }, (err: any) => {
          if (err) throw err
        })
      },
    },
    {
      title: 'Apply overrides',
      task: async () => {
        const baseDir = path.join(__dirname, 'overrides')
        const { stdout } = await execa('id', ['-u'])
        await execa('rsync', ['-a', '--delete', `${baseDir}/`, cwd], {
          uid: parseInt(stdout, 10),
        })
      },
    },
  ])
}

export default createGatsby
