import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TWITTER_LINK, REDDIT_LINK } from '@/components/RLinks'

const DISMISS_KEY = 'rngneeds-banner-dismissed'

function XIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  )
}

function TwitterSmallIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M16.712 6.652c.01.146.01.29.01.436 0 4.449-3.267 9.579-9.242 9.579v-.003a8.963 8.963 0 0 1-4.98-1.509 6.379 6.379 0 0 0 4.807-1.396c-1.39-.027-2.608-.966-3.035-2.337.487.097.99.077 1.467-.059-1.514-.316-2.606-1.696-2.606-3.3v-.041c.45.26.956.404 1.475.42C3.18 7.454 2.74 5.486 3.602 3.947c1.65 2.104 4.083 3.382 6.695 3.517a3.446 3.446 0 0 1 .94-3.217 3.172 3.172 0 0 1 4.596.148 6.38 6.38 0 0 0 2.063-.817 3.357 3.357 0 0 1-1.428 1.861 6.283 6.283 0 0 0 1.865-.53 6.735 6.735 0 0 1-1.62 1.744Z" />
    </svg>
  )
}

function RedditSmallIcon(props) {
  return (
    <svg viewBox="0 0 26 26" aria-hidden="true" {...props}>
      <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
    </svg>
  )
}

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash

  useEffect(() => {
    const wasDismissed = localStorage.getItem(DISMISS_KEY)
    if (!wasDismissed) {
      setDismissed(false)
    }
  }, [])

  function handleDismiss() {
    setDismissed(true)
    localStorage.setItem(DISMISS_KEY, 'true')
  }

  if (dismissed) return null

  return (
    <div className="sticky top-14 z-40 flex items-center justify-center gap-x-6 overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-2 sm:px-3.5">
      <p className="flex items-center gap-x-2 text-sm leading-6 text-white sm:gap-x-4">
        <strong className="font-semibold whitespace-nowrap"><span className="sm:hidden">Follow for tips!</span><span className="hidden sm:inline">Stay in the loop!</span></strong>
        <svg viewBox="0 0 2 2" className="mx-1 hidden h-0.5 w-0.5 fill-white sm:inline" aria-hidden="true">
          <circle cx="1" cy="1" r="1" />
        </svg>
        <span className="hidden sm:inline">Follow us for Unity tips, dev updates &amp; new features</span>
        <span className="flex items-center gap-x-3">
          <Link
            href={TWITTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/30"
          >
            <TwitterSmallIcon className="h-3.5 w-3.5 fill-white" />
            @StarphaseLab
          </Link>
          <Link
            href={REDDIT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-x-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/30"
          >
            <RedditSmallIcon className="h-3.5 w-3.5 fill-white" />
            Reddit
          </Link>
        </span>
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        className="-m-1.5 flex-none p-1.5 text-white/80 transition hover:text-white"
        aria-label="Dismiss banner"
      >
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
