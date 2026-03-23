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
        <title>{pageProps.title ? `${pageProps.title} - RNGNeeds Documentation` : 'RNGNeeds Documentation'}</title>
        <meta name="description" content={pageProps.description} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  )
}