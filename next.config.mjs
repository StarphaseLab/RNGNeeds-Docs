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
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/user-guide/introduction',
        permanent: true,
      },
      {
        source: '/zh-CN',
        destination: '/zh-CN/user-guide/introduction',
        permanent: true,
      },
      {
        source: '/ja-JP',
        destination: '/ja-JP/user-guide/introduction',
        permanent: true,
      },
    ]
  },
}

export default withSearch(withMDX(nextConfig))
