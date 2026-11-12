import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'
import { projectPath } from '@/i18n/ui'

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://chelalo.me')
  const entries = await getCollection('projects')
  const projects = entries.sort(
    (a, b) => a.data.order - b.data.order || a.data.locale.localeCompare(b.data.locale),
  )

  // The root entry is a noindex locale gateway; localized pages are canonical.
  const staticPaths = ['/es/', '/en/', '/es/projects/', '/en/projects/']
  const projectPaths = projects.map((entry) =>
    projectPath(entry.data.locale, entry.data.project),
  )

  const urls = [...staticPaths, ...projectPaths]
    .map((path) => `  <url><loc>${new URL(path, base).toString()}</loc></url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
