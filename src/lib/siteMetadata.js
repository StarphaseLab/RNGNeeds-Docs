const SITE_URL = 'https://docs.rngneeds.com'
const SITE_NAME = 'RNGNeeds'
const SITE_SUFFIX = 'RNGNeeds | Unity Probability Plugin'
const DEFAULT_DESCRIPTION =
  'RNGNeeds, a powerful Unity plugin for probability distribution. Design weighted loot tables, dice systems, item drops, and more with an intuitive visual inspector.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`
const ORG_URL = 'https://www.rngneeds.com'

const LOCALE_LABELS = {
  en: 'en',
  'zh-CN': 'zh-CN',
  'ja-JP': 'ja-JP',
}

export {
  SITE_URL,
  SITE_NAME,
  SITE_SUFFIX,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  ORG_URL,
  LOCALE_LABELS,
}

export function buildCanonicalUrl(pathname = '/') {
  const cleanPath = pathname.split('?')[0].split('#')[0] || '/'
  return `${SITE_URL}${cleanPath}`
}

export function inferDocSection(pathname = '/') {
  if (pathname.startsWith('/api-reference')) return 'api-reference'
  if (pathname.startsWith('/guides')) return 'guides'
  if (pathname.startsWith('/samples')) return 'samples'
  if (pathname.startsWith('/documentation')) return 'documentation'
  if (pathname.startsWith('/user-guide')) return 'user-guide'
  return 'site'
}

export function inferSchemaType(pathname = '/', pageTitle = '') {
  const section = inferDocSection(pathname)
  const normalizedTitle = pageTitle.toLowerCase()

  if (
    pathname === '/' ||
    pathname === '/user-guide' ||
    pathname === '/documentation' ||
    pathname === '/guides' ||
    pathname === '/samples' ||
    pathname === '/api-reference' ||
    normalizedTitle === 'overview' ||
    normalizedTitle.includes('overview')
  ) {
    return 'CollectionPage'
  }

  if (section === 'api-reference') return 'TechArticle'
  if (section === 'guides') return 'HowTo'
  if (section === 'samples') return 'TechArticle'
  if (section === 'documentation') return 'TechArticle'
  if (section === 'user-guide') return 'TechArticle'
  return 'WebPage'
}

export function buildStructuredData({ pathname = '/', title, description, locale = 'en' }) {
  const canonicalUrl = buildCanonicalUrl(pathname)
  const schemaType = inferSchemaType(pathname, title || '')
  const inLanguage = LOCALE_LABELS[locale] || 'en'
  const pageName = title ? `${title} | ${SITE_NAME} Documentation` : `${SITE_NAME} Documentation`
  const pageDescription = description || DEFAULT_DESCRIPTION

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} Documentation`,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'en',
        publisher: {
          '@id': `${ORG_URL}/#organization`,
        },
        potentialAction: {
          '@type': 'ReadAction',
          target: [SITE_URL, `${SITE_URL}/llms.txt`, `${SITE_URL}/llms-full.txt`],
        },
      },
      {
        '@type': 'Organization',
        '@id': `${ORG_URL}/#organization`,
        name: 'Starphase Lab',
        url: ORG_URL,
        sameAs: ['https://github.com/StarphaseLab'],
      },
      {
        '@type': schemaType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageName,
        headline: title || `${SITE_NAME} Documentation`,
        description: pageDescription,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${ORG_URL}/#organization`,
        },
        inLanguage,
      },
    ],
  }
}
