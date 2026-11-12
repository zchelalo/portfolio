import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const contentDirectory = fileURLToPath(new URL('../src/content/projects/', import.meta.url))
const errors = []
const warnings = []
const entries = []

const requiredHeadings = {
  es: [
    '## Contexto',
    '## Problema',
    '## Enfoque',
    '## Arquitectura',
    '## Decisiones',
    '## Resultados y estado',
  ],
  en: [
    '## Context',
    '## Problem',
    '## Approach',
    '## Architecture',
    '## Decisions',
    '## Outcomes and status',
  ],
}

const bannedPublicStrings = [
  'change-me',
  'admin@example.com',
  'TODO',
  '[VERIFY',
  'Lorem ipsum',
]

const files = (await readdir(contentDirectory))
  .filter((file) => file.endsWith('.md'))
  .sort()

if (files.length !== 8) {
  errors.push(`Expected 8 localized case studies, found ${files.length}.`)
}

for (const file of files) {
  const raw = await readFile(join(contentDirectory, file), 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

  if (!match) {
    errors.push(`${file}: missing YAML frontmatter.`)
    continue
  }

  const [, frontmatter, body] = match
  const value = (key) => {
    const line = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    return line?.[1]?.replace(/^['"]|['"]$/g, '').trim() ?? ''
  }

  const project = value('project')
  const locale = value('locale')
  const order = Number(value('order'))

  if (!project) errors.push(`${file}: missing project identifier.`)
  if (!['es', 'en'].includes(locale)) errors.push(`${file}: invalid locale "${locale}".`)
  if (!Number.isInteger(order) || order < 1) errors.push(`${file}: invalid order.`)

  if (project && locale) {
    entries.push({ file, project, locale, order })
  }

  for (const heading of requiredHeadings[locale] ?? []) {
    if (!body.includes(heading)) {
      errors.push(`${file}: missing required section "${heading}".`)
    }
  }

  for (const banned of bannedPublicStrings) {
    if (raw.includes(banned)) {
      errors.push(`${file}: contains forbidden public string "${banned}".`)
    }
  }

  if (project === 'comledge') {
    if (/https?:\/\//.test(frontmatter) || /https?:\/\//.test(body)) {
      errors.push(`${file}: Comledge must not publish deployment or source URLs.`)
    }
  }

  if (project === 'cestia') {
    const expected =
      locale === 'es' ? 'no calcula deudas' : 'does not calculate debts'
    if (!body.toLowerCase().includes(expected)) {
      errors.push(`${file}: Cestia must explicitly exclude debt calculations.`)
    }
  }

  if (project === 'chaoslab') {
    const available = locale === 'es' ? '**Disponible hoy:**' : '**Available today:**'
    if (!body.includes(available) || !body.includes('**Conceptual:**')) {
      errors.push(`${file}: ChaosLab must separate available and conceptual features.`)
    }
  }

  if (project === 'neuraclinic' && !/ficti/i.test(body)) {
    warnings.push(`${file}: NeuraClinic should identify demonstration data.`)
  }
}

const grouped = new Map()
for (const entry of entries) {
  const list = grouped.get(entry.project) ?? []
  list.push(entry)
  grouped.set(entry.project, list)
}

for (const [project, group] of grouped) {
  const locales = group.map((entry) => entry.locale).sort()
  if (locales.join(',') !== 'en,es') {
    errors.push(`${project}: expected one Spanish and one English entry, found ${locales.join(', ')}.`)
  }

  const orders = new Set(group.map((entry) => entry.order))
  if (orders.size !== 1) {
    errors.push(`${project}: localized entries disagree on order.`)
  }
}

const orders = [...grouped.values()].map((group) => group[0]?.order)
if (new Set(orders).size !== orders.length) {
  errors.push('Project order values must be unique.')
}

if (warnings.length) {
  for (const warning of warnings) console.warn(`warning: ${warning}`)
}

if (errors.length) {
  console.error(`\nContent validation failed with ${errors.length} error(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(
  `Content validation passed: ${entries.length} localized case studies across ${grouped.size} projects.`,
)
