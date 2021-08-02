import path from 'path'

import execa from 'execa'

import addScript from './utils/addScript'
import copyDir from './utils/copyDir'
import log from './utils/log'

const dependencies = ['react-native-localize', 'react-native-dotenv']

const scripts: { [key: string]: string } = {
  rename: 'npx react-native-rename-next',
  clean: 'npx react-native-clean-project',
  release: 'standard-version && react-native-version --amend',
}

async function reactNative(name: string) {
  const cwd = path.join(process.cwd(), name)
  const spinner = log.step(
    'Creating folder and initializing project with react-native template'
  )
  await execa('npx', [
    'react-native',
    'init',
    name,
    '--template',
    'react-native-template-typescript',
  ])

  log.step('Adding scripts to package.json')
  Object.keys(scripts).forEach(async (key) => {
    await addScript(`${cwd}/package.json`, key, scripts[key])
  })

  log.step('Installing dependencies')
  await execa(
    'npx',
    ['add-dependencies', '--save', '--save-exact', ...dependencies],
    {
      cwd,
    }
  )

  spinner.succeed()
}

async function postReactNative(name: string) {
  const cwd = path.join(process.cwd(), name)

  log.step('Adding project files')
  await copyDir(`${path.join(__dirname, './templates/react-native')}`, cwd)
}

export { postReactNative }

export default reactNative
