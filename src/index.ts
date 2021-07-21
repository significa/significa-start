import fs from 'fs'
import path from 'path'

import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import execa from 'execa'
import figlet from 'figlet'
import inquirer from 'inquirer'

import common from './common'
import cra, { postCra } from './cra'
import gatsby, { postGatsby } from './gatsby'
import next, { postNext } from './next'
import reactNative, { postReactNative } from './react-native'
import { gitInit, gitCommit } from './utils/git'
import log from './utils/log'
import parseProject from './utils/parseProject'

const stacks = ['cra', 'gatsby', 'next', 'react-native'] as const

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
      required: false,
      options: stacks as unknown as string[],
    },
    { name: 'name', required: false },
  ]

  async run() {
    log.info(
      `\n${chalk.yellow(
        figlet.textSync('significa-start', { horizontalLayout: 'default' })
      )}`
    )

    const { args }: { args: { type: Stacks; name: string } } =
      this.parse(SignificaStart)

    const type =
      args.type ||
      (
        await inquirer.prompt({
          message: 'Which stack would you like to use?',
          type: 'list',
          name: 'type',
          choices: [
            {
              name: 'NextJS',
              value: 'next',
            },
            {
              name: 'Gatsby',
              value: 'gatsby',
            },
            {
              name: 'Create React App',
              value: 'cra',
            },
            {
              name: 'React Native (Expo - bare workflow)',
              value: 'react-native',
            },
          ],
        })
      ).type

    const name =
      args.name ||
      (
        await inquirer.prompt({
          message: "What's the name of the project?",
          type: 'input',
          name: 'name',
          default: 'hello-world',
        })
      ).name

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
      case 'react-native':
        await reactNative(name)
        break
      default:
        log.error(`Expected ${type} to be one of: ${stacks.join(' ,')}`)
        process.exit(1)
    }

    // Add static type checking
    log.info('Adding static type checking and base configuration')
    await common(name)

    // Post-template
    switch (type) {
      case 'cra':
        await postCra(name)
        break
      case 'gatsby': {
        await postGatsby(name)
        break
      }
      case 'next':
        await postNext(name)
        break
      case 'react-native':
        await postReactNative(name)
        break
    }

    // Apply variables
    log.info('Parse project')
    await parseProject(path.join(process.cwd(), name), { name })

    // Git
    log.info('Git')
    await gitInit(name)

    // Install dependencies
    log.info('Install')
    const installSpinner = log.step('Installing dependencies')
    const packageManager = type === 'react-native' ? 'yarn' : 'npm'
    await execa(packageManager, ['install'], { cwd: name })
    installSpinner.succeed()

    // Commit dependencies
    log.info('Commit')
    await gitCommit(name, 'Initial files')

    log.success(
      `Project created! \n\n  Type in ${chalk.blue(
        `cd ${name}`
      )} and happy coding!\n`
    )
  }
}

export = SignificaStart
