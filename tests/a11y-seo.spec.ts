import { expect, test } from '@playwright/test'

const pages = [
  '/es/',
  '/en/',
  '/es/projects/',
  '/en/projects/',
  '/es/projects/neuraclinic/',
  '/en/projects/comledge/',
  '/es/projects/cestia/',
  '/en/projects/chaoslab/',
]

for (const path of pages) {
  test(`${path} has one main region and one h1`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveCount(1)

    const imagesWithoutAlt = await page.locator('img:not([alt])').count()
    expect(imagesWithoutAlt).toBe(0)

    const linksWithoutName = await page.locator('a:not([aria-label])').evaluateAll((links) =>
      links.filter((link) => !(link.textContent ?? '').trim()).length,
    )
    expect(linksWithoutName).toBe(0)
  })
}

test('skip link targets the main region', async ({ page }) => {
  await page.goto('/es/')
  await page.keyboard.press('Tab')
  const skip = page.locator('.skip-link')
  await expect(skip).toBeFocused()
  await skip.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
})

test('reduced motion keeps all content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/es/')
  const hidden = await page.locator('.reveal').evaluateAll((elements) =>
    elements.filter((element) => getComputedStyle(element).opacity === '0').length,
  )
  expect(hidden).toBe(0)
})

test('SEO endpoints and alternate links are present', async ({ page, request }) => {
  await page.goto('/es/projects/neuraclinic/')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://chelalo.me/es/projects/neuraclinic/',
  )
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
    'href',
    'https://chelalo.me/en/projects/neuraclinic/',
  )

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  expect(xml).toContain('https://chelalo.me/es/projects/comledge/')
  expect(xml).toContain('https://chelalo.me/en/')

  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain('Sitemap: https://chelalo.me/sitemap.xml')

  const og = await request.get('/og-default.png')
  expect(og.status()).toBe(200)
  expect(og.headers()['content-type']).toContain('image/png')

  for (const cv of ['/files/EduardoSaavedra-cv-es.pdf', '/files/EduardoSaavedra-cv-en.pdf']) {
    const pdf = await request.get(cv)
    expect(pdf.status()).toBe(200)
    expect(pdf.headers()['content-type']).toContain('application/pdf')
  }
})

test('home structured data exposes only the public country', async ({ page }) => {
  await page.goto('/es/')
  const data = await page.locator('script[type="application/ld+json"]').first().textContent()
  const person = JSON.parse(data ?? '{}')
  expect(person.address).toEqual({
    '@type': 'PostalAddress',
    addressCountry: 'MX',
  })
  expect(JSON.stringify(person)).not.toMatch(/Nogales|Sonora|Morelia/)
})

test('built case studies only link to public destinations', async ({ request }) => {
  const allowedHosts = new Set([
    'chelalo.me',
    'www.chelalo.me',
    'cestia.chelalo.me',
    'neuraclinic.app',
    'github.com',
    'www.linkedin.com',
  ])

  for (const path of pages) {
    const response = await request.get(path)
    const html = await response.text()
    const hrefs = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((match) => match[1])

    for (const href of hrefs) {
      const url = new URL(href)
      expect(allowedHosts.has(url.hostname), `${path} links to ${url.hostname}`).toBe(true)
      if (url.hostname === 'github.com') {
        expect(url.pathname, `${path} links to a non-profile GitHub page`).toBe('/zchelalo')
      }
    }
  }
})
