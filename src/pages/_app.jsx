import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import { Analytics } from '@vercel/analytics/react';
import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import 'focus-visible'
import Script from 'next/script';

const SITE_URL = 'https://docs.rngneeds.com'
const SITE_NAME = 'RNGNeeds'
const SITE_SUFFIX = 'RNGNeeds | Unity Probability Plugin'
const DEFAULT_DESCRIPTION = 'RNGNeeds — a powerful Unity plugin for probability distribution. Design weighted loot tables, dice systems, item drops, and more with an intuitive visual inspector.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()

  // Draft pages: hide in production, show with banner in development
  if (pageProps.draft && process.env.NODE_ENV === 'production') {
    return (
      <>
        <Head>
          <title>404 - RNGNeeds Documentation</title>
          <meta name="robots" content="noindex" />
        </Head>
        <MDXProvider components={mdxComponents}>
          <Layout {...pageProps}>
            <h1>Page not found</h1>
          </Layout>
        </MDXProvider>
      </>
    )
  }

  const pageTitle = pageProps.title
    ? `${pageProps.title} - ${SITE_SUFFIX}`
    : `Documentation - ${SITE_SUFFIX}`
  const pageDescription = pageProps.description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${SITE_URL}${router.asPath.split('?')[0].split('#')[0]}`

  return (
    <>
        <Analytics />
        {/*<Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}/>*/}
        {/*<Script*/}
        {/*    id='google-analytics'*/}
        {/*    strategy="afterInteractive"*/}
        {/*    dangerouslySetInnerHTML={{*/}
        {/*        __html: `*/}
        {/*  window.dataLayer = window.dataLayer || [];*/}
        {/*  function gtag(){dataLayer.push(arguments);}*/}
        {/*  gtag('js', new Date());*/}
        {/*  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {*/}
        {/*    page_path: window.location.pathname,*/}
        {/*  });*/}
        {/*`,*/}
        {/*    }}*/}
        {/*/>*/}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@StarphaseLab" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  )
}