import jsonfile from 'jsonfile'

function addScript(path: string, key: string, value: string, safe = false) {
  const content = jsonfile.readFileSync(path)
  if (!content.scripts) {
    content.scripts = {}
  }

  if (safe && content.scripts[key]) {
    throw new Error('Specified script already exists')
  }

  content.scripts[key] = value
  jsonfile.writeFileSync(path, content, { spaces: 2 })
}

export default addScript
