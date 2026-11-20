# RNGNeeds Documentation

The official documentation site for [RNGNeeds](https://assetstore.unity.com/packages/tools/utilities/rngneeds-probability-distribution-247024) — a probability distribution tool for Unity.

🌐 **Live site:** [docs.rngneeds.com](https://docs.rngneeds.com)

## About RNGNeeds

RNGNeeds is a Unity plugin that gives you intuitive, visual control over probability distributions. Design weighted random outcomes with a custom inspector, test them in real time, and integrate them into your game with a clean C# API.

- 🎲 Visual probability editor with drag-to-adjust bars
- 🔄 Repeat prevention, pick history, and depletable lists
- 📊 Built-in outcome testing and probability influence system
- 🎯 Works with any type — enums, objects, ScriptableObjects, and more

## Available in

- 🇬🇧 English
- 🇨🇳 中文 (Chinese)
- 🇯🇵 日本語 (Japanese)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. All pull requests should target the `dev` branch.

## AI-Friendly Docs

This site provides [llms.txt](https://docs.rngneeds.com/llms.txt) and [llms-full.txt](https://docs.rngneeds.com/llms-full.txt) for LLM consumption. The full version is auto-generated from source on every build.

## Built With

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)

## License

[MIT](LICENSE.md)

## Links

- 📦 [Unity Asset Store](https://assetstore.unity.com/packages/tools/utilities/rngneeds-probability-distribution-247024)
- 🌐 [Website](https://www.rngneeds.com)
- 📖 [Documentation](https://docs.rngneeds.com)
- 💬 [Discord](https://discord.gg/EghN9gFHmw)

## Hosting (Cloudflare Workers static assets)

`npm run build` runs the generators, builds `llms-full.txt` and does a static export
(`output: 'export'`) to `./out`, which `wrangler.jsonc` serves as Workers static assets.

- Workers Builds (Cloudflare Git integration), Worker name `rngneeds-docs`, production branch `deploy`
  (work on `dev`, merge to `deploy`); other branches get preview URLs.
  Build command `test -f wrangler.jsonc && npm run build`, deploy command `test -f wrangler.jsonc && npx wrangler deploy`,
  version (preview) command `test -f wrangler.jsonc && npx wrangler versions upload`. The `test -f` guard skips
  branches from before the Cloudflare move.
  Build variable `NODE_OPTIONS=--max-old-space-size=6144` (set in the dashboard): with Node's default
  heap the build runs out of memory. The build needs `bash` and Python 3 (both in the Workers Builds image).
- Headers and redirects: `public/_headers`, `public/_redirects` (copied into `./out`).
- Sticky locale (`NEXT_LOCALE` cookie): inline script in `src/pages/_document.jsx`.
- Analytics: Cloudflare Web Analytics; optional build variable `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN`.
- Local check of the real output: `npm run build && npm run preview` (http://127.0.0.1:8787).
