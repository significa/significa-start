import lodash from 'lodash'
import fs from 'fs'
import recursive from 'recursive-readdir'
import execa from 'execa'
import path from 'path'

import log from '../utils/log'

type Vars = { [key: string]: string }

lodash.templateSettings = {
  evaluate: /{{([\s\S]+?)}}/g,
  interpolate: /{{=([\s\S]+?)}}/g,
  escape: /{{-([\s\S]+?)}}/g,
}

/**
 * Template and override files can include block that are removed from the project:
 * // start-remove
 * any content here
 * // eslint-disable react/jsx-no-undef
 * more content
 * // end-remove
 */
const removeBlockRegex = /(\/\/\s{0,1}start-remove)(.|\n){0,}(\/\/\s{0,1}end-remove)/gim

async function parseProject(projectPath: string, vars: Vars) {
  const spinner = log.step(
    'Replacing variables and removing underscore from filenames'
  )

  const files = await recursive(projectPath, [
    'package-lock.json',
    '.git',
    '*.png',
    '*.jpg',
    '*.ico',
    '.DS_Store',
    file => {
      return file.indexOf('node_modules') !== -1
    },
  ])

  files.forEach(async file => {
    const content = await fs.readFileSync(file, 'utf8')
    const template = lodash.template(content)
    const newContent = template(vars).replace(removeBlockRegex, '')
    await fs.writeFileSync(file, newContent)
    const filename = path.basename(file)
    const fileDir = path.dirname(file)

    // Remove .example from filename
    if (/.example/gi.test(filename)) {
      await execa('mv', [filename, filename.replace(/.example/gi, '')], {
        cwd: fileDir,
      })
    }

    // Rename files that start with _
    if (filename.startsWith('_')) {
      await execa('mv', [filename, filename.replace(/^_/, '')], {
        cwd: fileDir,
      })
    }
  })

  spinner.succeed()
}

export default parseProject
