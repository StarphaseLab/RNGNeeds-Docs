import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { SectionProvider } from '@/components/SectionProvider'
import { TranslationBanner } from '@/components/TranslationBanner'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import logoRNG from '@/images/rngn-logo-2color.png'
import Image from "next/image";
import { useLocale, localizedPath } from '@/lib/locale'

export function Layout({ children, sections = [], translationStatus, draft }) {
  let locale = useLocale()
  let router = useRouter()
  // Key forces SectionProvider to recreate its store when the route changes,
  // preventing stale sections from accumulating across locale switches.
  let sectionKey = router.asPath.split('#')[0]
  return (
    <SectionProvider sections={sections} key={sectionKey}>
      <div className="lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
            <div className="hidden lg:flex">
              <Link href={localizedPath('/', locale)} aria-label="Home">
                <Image
                    src={logoRNG}
                    alt=""
                    width="160"
                />
              </Link>
            </div>
            <Header />
            <Navigation className="hidden lg:mt-10 lg:block" />
          </div>
        </motion.header>
        <AnnouncementBanner />
        <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
          <main className="py-16">
            {draft && process.env.NODE_ENV !== 'production' && (
              <div className="-mt-8 mb-6 rounded-lg border border-amber-500/20 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                📝 <strong>Draft</strong> — This page is a work in progress and will not be published.
              </div>
            )}
            <TranslationBanner translationStatus={translationStatus} />
            <Prose as="article">{children}</Prose>
          </main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
