import path from 'path'
import nextMDX from '@next/mdx'
import withSearch from './src/mdx/search.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { recmaPlugins } from './src/mdx/recma.mjs'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
    providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` writes plain HTML/JS to ./out, which Cloudflare
  // Workers serves as static assets (see wrangler.jsonc). Response headers and
  // redirects that used to live here are in public/_headers and public/_redirects;
  // the sticky-locale redirect that used to be src/middleware.js is a small inline
  // script in src/pages/_document.jsx.
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingRoot: path.resolve('.'),
  images: {
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: true,
  },
}

export default withSearch(withMDX(nextConfig))
