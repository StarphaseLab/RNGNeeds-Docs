import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import { markdownMirrorPages } from '../src/lib/markdownPages.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const pagesRoot = path.join(repoRoot, 'src/pages')
const publicRoot = path.join(repoRoot, 'public')
const stripScript = path.join(repoRoot, 'scripts/strip_mdx.py')

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
  const result = spawnSync('python3', [stripScript], {
    input: mdx,
    encoding: 'utf8',
  })

  if (result.status !== 0) {
    throw new Error(`Failed to render markdown mirror for ${page.sourcePath}: ${result.stderr}`)
  }

  const header = [
    `# ${page.title}`,
    '',
    `> Source: https://docs.rngneeds.com/${page.sourcePath}`,
    `> Description: ${page.description}`,
    '',
    '---',
    '',
  ].join('\n')

  fs.writeFileSync(outputFile, `${header}${result.stdout.trim()}\n`, 'utf8')
  console.log(`Generated ${path.relative(repoRoot, outputFile)}`)
}
