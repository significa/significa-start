import fs from 'fs'
import path from 'path'

import execa from 'execa'
import recursive from 'recursive-readdir'

import log from './log'

type Vars = { [key: string]: string }

/**
 * Template and override files can include block that are removed from the project:
 * // start-remove
 * any content here
 * // eslint-disable react/jsx-no-undef
 * more content
 * // end-remove
 */

/**
 * Simillarly, we can replace variables as such: {{= var }}
 */
const removeBlockRegex =
  /(\/\/\s{0,1}start-remove)(.|\n){0,}(\/\/\s{0,1}end-remove)/gim

const template = (content: string, params: Vars) => {
  let result = content

  Object.keys(params).forEach((key) => {
    result = result.replace(/{{=([\s\S]+?)}}/g, params[key])
  })

  return result
}

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
    (file) => {
      return file.indexOf('node_modules') !== -1
    },
  ])

  files.forEach(async (file) => {
    const content = await fs.readFileSync(file, 'utf8')
    const newContent = template(content, vars)
    fs.writeFileSync(file, newContent.replace(removeBlockRegex, ''))

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
