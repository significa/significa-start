import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import execa from 'execa'
import Listr from 'listr'

import { projectTypes, Stacks } from './types'

import createGatsby from './lib/gatsby'
import applyCommonConfig from './lib/common'
import applyOverrides from './lib/overrides'

class SignificaStart extends Command {
  static description = 'Significa project starter'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n', description: "Project's name" }),
    type: flags.string({
      char: 't',
      description: `Project's type (${projectTypes.join(', ')})`,
    }),
  }

  static args = [
    {
      name: 'type',
      required: true,
      options: (projectTypes as unknown) as string[],
    },
    { name: 'name', required: true },
  ]

  startProject(name: string, type: Stacks) {
    switch (type) {
      case 'cra':
        return execa('npx', ['create-react-app', name, '--typescript'])
      case 'gatsby': {
        return createGatsby(name)
      }
      case 'next':
        return execa('npx', [
          'create-next-app',
          '--example',
          'with-typescript',
          name,
        ])
      default:
        break
    }
  }

  async run() {
    const {
      args: { name, type },
    }: { args: { name: string; type: Stacks } } = this.parse(SignificaStart)

    const task = new Listr([
      {
        title: `Starting new ${chalk.yellow(type)} project: ${chalk.blue(
          name
        )}`,
        task: async () => this.startProject(name, type),
      },
      {
        title: 'Apply common src folder',
        task: async () => {},
      },
      {
        title: 'Static type checking',
        task: async () => applyCommonConfig(name),
      },
      {
        title: 'Apply overrides',
        task: async () => applyOverrides(name, type),
      },
      {
        title: 'Final touches', // Git, etc.
        task: async () => {},
      },
    ])

    task.run().catch(() => {}) // noop
  }
}

export = SignificaStart
