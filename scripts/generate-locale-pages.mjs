#!/usr/bin/env node

/**
 * Auto-generate proxy page files for locale translations.
 *
 * Two types of proxy files:
 *
 * 1. TRANSLATED: For each `*.zh-CN.mdx` file, create a proxy at
 *    src/pages/zh-CN/<path>.jsx that re-exports from the translated MDX.
 *    These pages have translationStatus set in the MDX file.
 *
 * 2. FALLBACK: For each English MDX page that does NOT have a translation,
 *    create a proxy that re-exports the English MDX. The TranslationBanner
 *    will show "untranslated" because translationStatus won't be exported.
 *
 * This ensures every page has a /zh-CN/ route, so nav links always work
 * when the user is in Chinese locale.
 *
 * Run: node scripts/generate-locale-pages.mjs
 * These files are gitignored — run before dev/build.
 */

import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'fs'
import { join, dirname, relative, basename } from 'path'

const PAGES_DIR = join(import.meta.dirname, '..', 'src', 'pages')
const LOCALES = ['zh-CN', 'ja-JP']

// Directories to skip when scanning for pages
const SKIP_DIRS = new Set(['_next', 'api', 'unused', ...LOCALES])

// Files to skip (not real pages)
const SKIP_FILES = new Set(['_app.jsx', '_document.jsx', '_app.js', '_document.js', 'index.mdx'])

function findAllMdxFiles(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue
      findAllMdxFiles(full, results)
    } else if (entry.endsWith('.mdx') && !SKIP_FILES.has(entry)) {
      results.push(full)
    }
  }
  return results
}

function generateForLocale(locale) {
  const localeDir = join(PAGES_DIR, locale)

  // Clean previous generated files
  if (existsSync(localeDir)) {
    rmSync(localeDir, { recursive: true })
  }

  const allMdx = findAllMdxFiles(PAGES_DIR)

  // Separate translated vs English-only files
  const translatedSuffix = `.${locale}.mdx`
  const translatedFiles = new Set()
  const englishFiles = []

  for (const file of allMdx) {
    const name = basename(file)
    if (name.endsWith(translatedSuffix)) {
      // This is a translation file — record the English base path
      const relToPages = relative(PAGES_DIR, file)
      const dir = dirname(relToPages)
      const base = basename(relToPages, translatedSuffix)
      translatedFiles.add(join(dir, base).replace(/\\/g, '/'))
    }
  }

  for (const file of allMdx) {
    const name = basename(file)
    // Skip translation files themselves
    if (name.endsWith(translatedSuffix)) continue
    // Skip any other locale files
    if (LOCALES.some(l => l !== locale && name.endsWith(`.${l}.mdx`))) continue

    const relToPages = relative(PAGES_DIR, file)
    const dir = dirname(relToPages)
    const base = basename(relToPages, '.mdx')
    const key = (dir === '.' ? base : `${dir}/${base}`).replace(/\\/g, '/')

    englishFiles.push({ file, relToPages, dir, base, key })
  }

  let translated = 0
  let fallback = 0

  for (const { relToPages, dir, base, key } of englishFiles) {
    const hasTranslation = translatedFiles.has(key)
    const proxyDir = dir === '.' ? localeDir : join(localeDir, dir)
    const proxyFile = join(proxyDir, `${base}.jsx`)

    // Calculate import depth
    const depth = (dir === '.' ? 0 : dir.split('/').length) + 1
    const upPath = '../'.repeat(depth)

    let importFile, comment
    if (hasTranslation) {
      // Import from the translated MDX
      importFile = `${upPath}${dir === '.' ? '' : dir + '/'}${base}.${locale}.mdx`
      comment = `// AUTO-GENERATED (translated) — do not edit. Run: node scripts/generate-locale-pages.mjs`
      translated++
    } else {
      // Import from the English MDX (fallback)
      importFile = `${upPath}${relToPages.replace(/\\/g, '/')}`
      comment = `// AUTO-GENERATED (fallback to English) — do not edit. Run: node scripts/generate-locale-pages.mjs`
      fallback++
    }

    // Re-export default (component) + getStaticProps (sections, title, description, translationStatus).
    // The recma pipeline strips named exports from MDX and bundles them into getStaticProps,
    // so we must re-export getStaticProps — not the individual named exports.
    const content = `${comment}
export { default, getStaticProps } from '${importFile}'
`

    mkdirSync(proxyDir, { recursive: true })
    writeFileSync(proxyFile, content, 'utf-8')

    const label = hasTranslation ? '✓' : '·'
    console.log(`  ${label} ${locale}/${dir === '.' ? '' : dir + '/'}${base}.jsx`)
  }

  return { translated, fallback }
}

console.log('Generating locale proxy pages...\n')
for (const locale of LOCALES) {
  console.log(`Locale: ${locale}`)
  const { translated, fallback } = generateForLocale(locale)
  console.log(`\n  ${translated} translated, ${fallback} fallback (English)\n`)
}
console.log('Done.')
