import clsx from 'clsx'

import { Tag } from '@/components/Tag'

const toneStyles = {
  neutral:
    'border-zinc-900/5 bg-white/40 dark:border-white/10 dark:bg-white/[0.02]',
  sky: 'border-sky-500/20 bg-sky-50/60 dark:border-sky-400/20 dark:bg-sky-400/5',
  emerald:
    'border-emerald-500/20 bg-emerald-50/60 dark:border-emerald-400/20 dark:bg-emerald-400/5',
  amber:
    'border-amber-500/20 bg-amber-50/60 dark:border-amber-400/20 dark:bg-amber-400/5',
  violet:
    'border-violet-500/20 bg-violet-50/60 dark:border-violet-400/20 dark:bg-violet-400/5',
}

export function MemberGroup({ title, children, tone = 'neutral' }) {
  return (
    <section className="my-10">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="m-0 text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h2>
      </div>
      <div
        className={clsx(
          'overflow-hidden rounded-2xl border divide-y divide-zinc-900/5 dark:divide-white/10',
          toneStyles[tone]
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function Member({ kind, name, signature, children, color, subtle = false }) {
  return (
    <div className="px-5 py-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        {kind ? <Tag color={color}>{kind}</Tag> : null}
        <code
          className={clsx(
            'text-[0.95rem] font-semibold text-zinc-900 dark:text-white',
            subtle && 'font-medium'
          )}
        >
          {name}
        </code>
        {signature ? (
          <div className="w-full font-mono text-xs text-zinc-500 dark:text-zinc-400 sm:w-auto sm:flex-1">
            {signature}
          </div>
        ) : null}
      </div>
      <div className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function LinkGrid({ children }) {
  return <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
}

export function LinkCard({ title, href, children }) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-zinc-900/5 bg-white/50 p-5 transition hover:border-sky-500/30 hover:bg-sky-50/50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-sky-400/30 dark:hover:bg-sky-400/5"
    >
      <div className="text-sm font-semibold text-zinc-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300">
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{children}</div>
    </a>
  )
}
