import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const { render, routes } = await import(
  pathToFileURL(path.resolve(root, 'dist/server/entry-server.js')).href
)

const template = fs.readFileSync(path.resolve(root, 'dist/index.html'), 'utf-8')

for (const route of routes) {
  // Translate the URL path into the same hash string App uses in the
  // browser (e.g. "/termos" → "termos"). "/" renders HomeStack.
  const ssrHash = route.path === '/' ? '' : route.path.replace(/^\//, '').toLowerCase()
  const appHtml = render(ssrHash)

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${route.description}"`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${route.title}"`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${route.description}"`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="https://v7m.org${route.path}"`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${route.title}"`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${route.description}"`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="https://v7m.org${route.path}"`,
    )
    .replace(/<div id="root">[^]*<\/div>/, `<div id="root">${appHtml}</div>`)
    // Per-route WebPage schema. The base Organization block in
    // index.html stays constant (brand-level), this script adds the
    // page-level metadata so each route matches its visible content.
    .replace(
      '<!--ROUTE_WEBPAGE_SCHEMA-->',
      `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: route.title,
        description: route.description,
        url: `https://v7m.org${route.path}`,
        inLanguage: 'pt-BR',
        isPartOf: { '@type': 'WebSite', name: 'v7m.org', url: 'https://v7m.org/' },
      })}</script>`,
    )

  const outDir =
    route.path === '/'
      ? path.resolve(root, 'dist')
      : path.resolve(root, 'dist', route.path.slice(1))

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.resolve(outDir, 'index.html'), html)
  console.log(`Prerendered: ${route.path}`)
}

console.log('Prerender complete.')
