import { useRouter } from 'next/router'
import { useLocale, stripLocalePrefix } from '@/lib/locale'

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'zh-CN', label: '中文' },
  { code: 'ja-JP', label: '日本語' },
]

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; path=/; expires=${expires}; SameSite=Lax`
}

function deleteCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
}

export function LanguageSwitcher() {
  const router = useRouter()
  const currentLocale = useLocale()

  function switchLocale(newLocale) {
    const { asPath } = router
    const canonicalPath = stripLocalePrefix(asPath)

    if (newLocale === 'en') {
      deleteCookie('NEXT_LOCALE')
      router.push(canonicalPath)
    } else {
      setCookie('NEXT_LOCALE', newLocale, 365)
      router.push(`/${newLocale}${canonicalPath}`)
    }
  }

  return (
    <div className="flex items-center gap-1 text-xs whitespace-nowrap">
      {locales.map((loc, i) => (
        <span key={loc.code}>
          {i > 0 && (
            <span className="text-zinc-300 dark:text-zinc-600"> / </span>
          )}
          {loc.code === currentLocale ? (
            <span className="font-semibold text-zinc-900 dark:text-white">
              {loc.label}
            </span>
          ) : (
            <button
              onClick={() => switchLocale(loc.code)}
              className="text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              {loc.label}
            </button>
          )}
        </span>
      ))}
    </div>
  )
}
