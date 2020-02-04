import { Command, flags } from '@oclif/command'
import fs from 'fs'
import chalk from 'chalk'
import path from 'path'

import gatsby from './gatsby'
import next from './next'
import cra from './cra'
import common from './common'

import log from './lib/log'
import overrides from './lib/overrides'
import initGit from './lib/git'
import addSrc from './lib/addSrc'
import parseProject from './lib/parseProject'

const stacks = ['cra', 'gatsby', 'next'] as const

type Stacks = typeof stacks[number]

class SignificaStart extends Command {
  static description = 'Significa project starter'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n', description: "Project's name" }),
    type: flags.string({
      char: 't',
      description: `Project's type (${stacks.join(', ')})`,
    }),
  }

  static args = [
    {
      name: 'type',
      required: true,
      options: (stacks as unknown) as string[],
    },
    { name: 'name', required: true },
  ]

  async run() {
    const {
      args: { name, type },
    }: { args: { name: string; type: Stacks } } = this.parse(SignificaStart)

    if (fs.existsSync(name)) {
      log.error('Folder already exists')
      process.exit(1)
    }

    // Start project
    log.info(`Starting new ${chalk.yellow(type)} project: ${chalk.blue(name)}`)
    switch (type) {
      case 'cra':
        await cra(name)
        break
      case 'gatsby': {
        await gatsby(name)
        break
      }
      case 'next':
        await next(name)
        break
      default:
        log.error(`Expected ${type} to be one of: ${stacks.join(' ,')}`)
        process.exit(1)
    }

    // Apply src folder
    log.info('Adding base src folder')
    await addSrc(name, 'git@github.com:Significa/significa-src.git')

    // Apply Significa UI
    log.info('Adding base UI components')
    await addSrc(name, 'git@github.com:Significa/significa-ui.git')

    // Add static type checking
    log.info('Adding static type checking and base configuration')
    await common(name)

    // Apply overrides
    log.info('Applying project overrides')
    await overrides(name, type)

    // Apply variables
    log.info('Parse project')
    await parseProject(path.join(process.cwd(), name), { name })

    // Tests
    if (type !== 'cra') {
      const shouldAddTests = await log.confirm('Add tests?')

      if (shouldAddTests) {
        // Add tests
        // <here>
      }
    }

    // Storybook
    const shouldAddStorybook = await log.confirm('Add storybook?')

    if (shouldAddStorybook) {
      // Add storybook
      // <here>
    }

    // Git
    log.info('Git')
    await initGit(name)

    log.success(
      `Project created! \n\n  Type in ${chalk.blue(
        `cd ${name}`
      )} and happy coding!\n`
    )
  }
}

export = SignificaStart
