import { expect, test } from '@playwright/test'

const locales = [
  { code: 'es', heading: 'Hola, soy Eduardo.', cv: '/files/EduardoSaavedra-cv-es.pdf' },
  { code: 'en', heading: "Hi, I'm Eduardo.", cv: '/files/EduardoSaavedra-cv-en.pdf' },
]

for (const locale of locales) {
  test(`${locale.code} home has the full journey`, async ({ page }) => {
    await page.goto(`/${locale.code}/`)

    await expect(page.getByRole('heading', { level: 1 })).toContainText(locale.heading)
    await expect(page.locator('.project-card')).toHaveCount(4)

    await page.locator('#projects').scrollIntoViewIfNeeded()
    await expect(page.locator('.project-card').first()).toBeVisible()
    await expect(page.locator('.timeline-item')).toHaveCount(3)
    await expect(page.locator('.timeline-item').first()).toContainText('COEN')
    await expect(page.locator('body')).not.toContainText(/Trabajo anterior|Earlier work/)
    await expect(page.locator('body')).not.toContainText(/Saloncito|Notitas/)
    await expect(page.getByText(locale.code === 'es' ? 'México' : 'Mexico', { exact: true }).first()).toBeVisible()
    await expect(page.locator('.nav-desktop a').first()).toHaveAttribute(
      'href',
      `/${locale.code}/#projects`,
    )
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('smooth')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    expect(overflow).toBe(false)

    const cv = page.locator(`.cv-link[href="${locale.cv}"]`)
    if (await cv.isVisible()) {
      await expect(cv).toHaveAttribute('href', locale.cv)
    }
  })
}

test('English resume labels use no accents and the footer omits build notes', async ({ page }) => {
  await page.goto('/en/')

  await expect(page.locator('.cv-link')).toHaveText(/Resume/)
  await expect(
    page.locator('[data-mobile-nav] a[href="/files/EduardoSaavedra-cv-en.pdf"]'),
  ).toHaveText(/Resume/)
  await expect(page.locator('body')).not.toContainText(/Résumé|resumé|résumé|Resumé/)
  await expect(page.locator('body')).not.toContainText(
    /Built with Astro|deployed as a static site|Construido con Astro|sitio estático/,
  )
})

test('language switch preserves the current project', async ({ page }) => {
  await page.goto('/es/projects/neuraclinic/')
  await page.locator('.lang-switch').click()
  await expect(page).toHaveURL(/\/en\/projects\/neuraclinic\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NeuraClinic')
})

test('theme preference persists', async ({ page }) => {
  await page.goto('/es/')
  const toggle = page.locator('[data-theme-toggle]')
  const before = await page.locator('html').getAttribute('data-theme')
  await toggle.click()
  const next = await page.locator('html').getAttribute('data-theme')
  expect(next).not.toBe(before)

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', next ?? 'light')
})

test('mobile navigation is keyboard accessible', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation only')
  await page.goto('/es/')
  const menu = page.locator('[data-mobile-nav]')
  await menu.locator('summary').click()
  await expect(menu).toHaveAttribute('open', '')
  await expect(menu.getByRole('link', { name: 'Experiencia' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).not.toHaveAttribute('open', '')
})

test('root gateway uses the stored or browser language', async ({ page }) => {
  await page.goto('/en/projects/cestia/')
  await page.goto('/')
  await expect(page).toHaveURL(/\/en\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Eduardo.")
})

test('content remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/en/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Eduardo.")
  await expect(page.locator('.project-card')).toHaveCount(4)
  await expect(page.locator('.timeline-item')).toHaveCount(3)
  await expect(page.locator('.nav-desktop a').first()).toHaveAttribute('href', '/en/#projects')
  await context.close()
})
