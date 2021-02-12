import path from 'path'

import execa from 'execa'

import log from './lib/log'
import addScript from './lib/addScript'

const scripts: { [key: string]: string } = {
  rename: 'npx react-native-rename-next',
  clean: 'npx react-native-clean-project',
  postinstall:
    'cd ios && pod install || echo "Warn: iOS \'pod\' tool not found">&2',
}

async function reactNative(name: string) {
  const cwd = path.join(process.cwd(), name)
  const spinner = log.step(
    'Creating folder and initializing project through expo-cli'
  )
  await execa('npx', [
    'expo-cli',
    'init',
    '--name',
    name,
    '--template',
    'expo-template-bare-typescript',
    '--yarn',
    '--no-install',
  ])

  log.step('Adding scripts to package.json')
  Object.keys(scripts).forEach(async (key) => {
    await addScript(`${cwd}/package.json`, key, scripts[key])
  })

  log.step('Adding project files')

  log.step('Adding dependencies')

  spinner.succeed()
}

export default reactNative
