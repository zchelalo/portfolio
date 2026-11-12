import { getCollection, type CollectionEntry } from 'astro:content'
import type { Locale } from '@/i18n/ui'

export type ProjectEntry = CollectionEntry<'projects'>

export async function getProjects(locale: Locale): Promise<ProjectEntry[]> {
  const entries = await getCollection('projects', ({ data }) => data.locale === locale)
  return entries.sort((a, b) => a.data.order - b.data.order)
}

export async function getProject(locale: Locale, slug: string): Promise<ProjectEntry | undefined> {
  const entries = await getCollection(
    'projects',
    ({ data }) => data.locale === locale && data.project === slug,
  )
  return entries[0]
}

export function nextProject(projects: ProjectEntry[], currentSlug: string): ProjectEntry {
  const index = projects.findIndex((project) => project.data.project === currentSlug)
  return projects[(index + 1) % projects.length]!
}
