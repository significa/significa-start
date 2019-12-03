import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import execa from 'execa'

import createGatsby from './stacks/gatsby'
import Listr from 'listr'

const projectTypes = ['cra', 'gatsby', 'next']

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
      options: projectTypes,
    },
    { name: 'name', required: true },
  ]

  createProject(type: string, name: string) {
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
    const { args } = this.parse(SignificaStart)

    const task = new Listr([
      {
        title: `Starting new ${args.type} project: ${chalk.blue(args.name)}`,
        task: () => this.createProject(args.type, args.name),
      },
    ])

    task.run().catch(() => {}) // noop
  }
}

export = SignificaStart
