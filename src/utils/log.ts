import chalk from 'chalk'
import ora, { Ora } from 'ora'
import cli from 'cli-ux'

export function info(message: string) {
  console.log(`\n${chalk.blue('→')} ${message}`)
}

export function error(message: string) {
  console.log(`\n${chalk.red('→ Error:')} ${message}`)
}

export function success(message: string) {
  console.log(`\n${chalk.green(`→ ${message}`)}`)
}

let lastSpinnerText = ''
let spinner: Ora

export function step(message: string, indent = 2) {
  if (!spinner || (spinner && spinner.indent !== indent)) {
    spinner = ora()
    spinner.color = 'blue'
    spinner.indent = indent
  }

  if (spinner.isSpinning) {
    spinner.stopAndPersist({
      text: lastSpinnerText,
      symbol: chalk.green('✔'),
    })
  }

  spinner.text = message
  lastSpinnerText = message
  spinner.start()

  return spinner
}

export function confirm(message: string) {
  return cli.confirm(`\n${chalk.blue('→')} ${message} ${chalk.dim('y/n')}`)
}

export default {
  info,
  error,
  success,
  step,
  confirm,
}
