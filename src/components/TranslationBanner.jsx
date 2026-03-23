import { useRouter } from 'next/router'
import { useLocale, stripLocalePrefix } from '@/lib/locale'

const REPO_URL = 'https://github.com/StarphaseLab/RNGNeeds-Docs'

const messages = {
  'zh-CN': {
    auto: '本页面由机器自动翻译，可能存在不准确之处。',
    community: '本页面由社区翻译。',
    untranslated: '本页面尚未翻译，以下为英文原文。',
    suggest: '建议改进',
    viewOriginal: '查看英文原版',
    helpTranslate: '帮助翻译此页面',
  },
  'ja-JP': {
    auto: 'このページは機械翻訳されたものであり、不正確な部分がある可能性があります。',
    community: 'このページはコミュニティによって翻訳されました。',
    untranslated: 'このページはまだ翻訳されていません。英語の原文を表示しています。',
    suggest: '改善を提案する',
    viewOriginal: '英語版を表示',
    helpTranslate: 'このページの翻訳を手伝う',
  },
}

const fallbackMessages = {
  auto: 'This page was automatically translated and may contain inaccuracies.',
  community: 'This page was translated by the community.',
  untranslated: 'This page is not yet translated and is shown in English.',
  suggest: 'Suggest improvements',
  viewOriginal: 'View English original',
  helpTranslate: 'Help translate this page',
}

export function TranslationBanner({ translationStatus }) {
  const { asPath } = useRouter()
  const locale = useLocale()

  // Don't show banner for English or verified translations
  if (locale === 'en' || translationStatus === 'verified') {
    return null
  }

  const t = messages[locale] || fallbackMessages

  // If translationStatus is undefined/null, it's an untranslated page
  // shown in English under the /zh-CN/ prefix
  const isUntranslated = !translationStatus
  const msg = isUntranslated
    ? t.untranslated
    : translationStatus === 'community'
      ? t.community
      : t.auto

  // English version path (strip locale prefix)
  const englishPath = stripLocalePrefix(asPath)

  // GitHub issue link pre-filled
  const issueTitle = encodeURIComponent(
    isUntranslated
      ? `Translation request: ${englishPath} (${locale})`
      : `Translation improvement: ${englishPath} (${locale})`
  )
  const issueBody = encodeURIComponent(
    `**Page:** \`${englishPath}\`\n**Language:** ${locale}\n**Current status:** ${translationStatus || 'untranslated'}\n\n**Suggested change:**\n\n`
  )
  const suggestUrl = `${REPO_URL}/issues/new?title=${issueTitle}&body=${issueBody}&labels=translation`

  // Styling
  const colors = isUntranslated
    ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200'
    : 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-200'
  const linkColors = isUntranslated
    ? 'text-amber-700 decoration-amber-300 hover:text-amber-900 dark:text-amber-400 dark:decoration-amber-700 dark:hover:text-amber-200'
    : 'text-sky-700 decoration-sky-300 hover:text-sky-900 dark:text-sky-400 dark:decoration-sky-700 dark:hover:text-sky-200'

  return (
    <div className={`-mt-8 mb-6 rounded-lg border px-4 py-3 text-sm ${colors}`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>🌐 {msg}</span>
        <div className="flex gap-3 text-xs">
          <a
            href={suggestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium underline ${linkColors}`}
          >
            {isUntranslated ? t.helpTranslate : t.suggest} →
          </a>
          {!isUntranslated && (
            <a
              href={englishPath}
              className={`font-medium underline ${linkColors}`}
            >
              {t.viewOriginal}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
