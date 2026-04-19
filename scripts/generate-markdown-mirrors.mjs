import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import { markdownMirrorPages } from '../src/lib/markdownPages.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const pagesRoot = path.join(repoRoot, 'src/pages')
const publicRoot = path.join(repoRoot, 'public')
const stripScript = path.join(repoRoot, 'scripts/strip_mdx.py')

function runStripMdx(input) {
  const candidates = process.platform === 'win32'
    ? [
        ['py', ['-3', stripScript]],
        ['python', [stripScript]],
        ['python3', [stripScript]],
      ]
    : [
        ['python3', [stripScript]],
        ['python', [stripScript]],
      ]

  let lastError = null

  for (const [command, args] of candidates) {
    const result = spawnSync(command, args, {
      input,
      encoding: 'utf8',
    })

    if (result.error) {
      lastError = result.error
      continue
    }

    if (result.status === 0) {
      return result.stdout
    }

    throw new Error(result.stderr || `${command} exited with status ${result.status}`)
  }

  throw new Error(
    `Could not find a usable Python runtime for markdown mirror generation. Last error: ${lastError?.message || 'unknown error'}`
  )
}

fs.mkdirSync(publicRoot, { recursive: true })

for (const page of markdownMirrorPages) {
  const sourceFile = path.join(pagesRoot, `${page.sourcePath}.mdx`)
  const outputFile = path.join(publicRoot, page.outputPath)
  const outputDir = path.dirname(outputFile)

  if (!fs.existsSync(sourceFile)) {
    console.warn(`Skipping missing source: ${sourceFile}`)
    continue
  }

  fs.mkdirSync(outputDir, { recursive: true })

  const mdx = fs.readFileSync(sourceFile, 'utf8')
  const markdown = runStripMdx(mdx)

  const header = [
    `# ${page.title}`,
    '',
    `> Source: https://docs.rngneeds.com/${page.sourcePath}`,
    `> Description: ${page.description}`,
    '',
    '---',
    '',
  ].join('\n')

  fs.writeFileSync(outputFile, `${header}${markdown.trim()}\n`, 'utf8')
  console.log(`Generated ${path.relative(repoRoot, outputFile)}`)
}
