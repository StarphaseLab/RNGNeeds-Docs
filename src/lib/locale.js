import { useRouter } from 'next/router'

const SUPPORTED_LOCALES = ['zh-CN', 'ja-JP']

/**
 * Get current locale from pathname.
 */
export function getLocaleFromPath(pathname) {
  for (const locale of SUPPORTED_LOCALES) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale
    }
  }
  return 'en'
}

/**
 * Strip locale prefix from a path to get the canonical (English) path.
 */
export function stripLocalePrefix(pathname) {
  for (const locale of SUPPORTED_LOCALES) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return pathname.slice(`/${locale}`.length) || '/'
    }
  }
  return pathname
}

/**
 * Add locale prefix to a path if needed.
 */
export function localizedPath(pathname, locale) {
  if (locale === 'en' || !locale) return pathname
  // Don't double-prefix
  if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) return pathname
  return `/${locale}${pathname}`
}

/**
 * React hook — returns current locale derived from router path.
 */
export function useLocale() {
  const { asPath } = useRouter()
  return getLocaleFromPath(asPath)
}
