import { Head, Html, Main, NextScript } from 'next/document'
import Script from "next/script";

const localeScript = `
  // Set <html lang> from URL path (functional, no cookie needed)
  (function() {
    var m = location.pathname.match(/^\\/([a-z]{2}-[A-Z]{2})[\\/]/);
    if (m) document.documentElement.lang = m[1];
  })();

  // Sticky locale (replaces the old Next.js middleware, which a static export can't run).
  // - On a /zh-CN/ or /ja-JP/ page: remember that locale in the NEXT_LOCALE cookie.
  // - On an English page with that cookie set: go to the same page in that locale.
  // Runs in <head> before anything renders, so the English page never paints.
  // The cookie is functional (the reader's own language choice); LanguageSwitcher
  // sets it, and clears it when the reader picks EN.
  (function() {
    try {
      var locales = ['zh-CN', 'ja-JP'];
      var path = location.pathname;
      for (var i = 0; i < locales.length; i++) {
        var l = locales[i];
        if (path === '/' + l || path.indexOf('/' + l + '/') === 0) {
          document.cookie = 'NEXT_LOCALE=' + l + '; path=/; max-age=31536000; SameSite=Lax';
          return;
        }
      }
      var c = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
      if (c && locales.indexOf(c[1]) !== -1 && path.indexOf('.') === -1) {
        location.replace('/' + c[1] + path + location.search + location.hash);
      }
    } catch (e) {}
  })();
`

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: localeScript + modeScript }} />
      </Head>
        <body className="bg-zinc-100 antialiased dark:bg-rngbg-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
