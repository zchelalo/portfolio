import { expect, test } from '@playwright/test'

const projectPages = [
  { locale: 'es', slug: 'neuraclinic' },
  { locale: 'en', slug: 'neuraclinic' },
  { locale: 'es', slug: 'comledge' },
  { locale: 'en', slug: 'comledge' },
  { locale: 'es', slug: 'cestia' },
  { locale: 'en', slug: 'cestia' },
  { locale: 'es', slug: 'chaoslab' },
  { locale: 'en', slug: 'chaoslab' },
]

for (const project of projectPages) {
  test(`${project.locale}/${project.slug} renders a complete case study`, async ({ page }) => {
    const response = await page.goto(`/${project.locale}/projects/${project.slug}/`)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      new RegExp(project.slug, 'i'),
    )

    const headings = page.locator('.prose h2')
    const headingCount = await headings.count()
    expect(headingCount).toBe(6)
    for (let index = 0; index < headingCount; index += 1) {
      await expect(headings.nth(index)).toBeVisible()
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    expect(overflow).toBe(false)
  })
}

test('gallery frames align and preserve image proportions', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Two-column gallery layout only')
  await page.goto('/es/projects/neuraclinic/')
  const frames = page.locator('.shot__frame')
  await expect(frames).toHaveCount(6)

  const boxes = await frames.evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect()
      const image = element.querySelector('img')
      return {
        height: Math.round(box.height),
        width: Math.round(box.width),
        fit: image ? getComputedStyle(image).objectFit : '',
      }
    }),
  )

  expect(new Set(boxes.map((box) => box.height)).size).toBe(1)
  expect(new Set(boxes.map((box) => box.width)).size).toBe(1)
  expect(new Set(boxes.map((box) => box.fit))).toEqual(new Set(['contain']))
})

test('project index breadcrumb and eyebrow use separate lines', async ({ page }) => {
  await page.goto('/es/projects/')
  const breadcrumb = await page.locator('.breadcrumb').boundingBox()
  const eyebrow = await page.locator('.eyebrow').first().boundingBox()
  expect(breadcrumb).not.toBeNull()
  expect(eyebrow).not.toBeNull()
  expect(eyebrow!.y).toBeGreaterThan(breadcrumb!.y + breadcrumb!.height - 1)
})

test('case study closing has a single footer separator', async ({ page }) => {
  await page.goto('/es/projects/neuraclinic/')
  expect(
    await page.locator('.project-next').evaluate((el) => getComputedStyle(el).borderTopWidth),
  ).toBe('0px')
  expect(
    await page.locator('.site-footer').evaluate((el) => getComputedStyle(el).borderTopWidth),
  ).toBe('1px')

  const margins = await page.locator('.project-next').evaluate((el) => {
    const styles = getComputedStyle(el)
    return {
      top: Number.parseFloat(styles.marginTop),
      bottom: Number.parseFloat(styles.marginBottom),
    }
  })
  expect(margins.top).toBeGreaterThan(0)
  expect(margins.bottom).toBeGreaterThan(0)
  expect(Math.abs(margins.top - margins.bottom)).toBeLessThan(1)
})

test('Cestia mobile gallery uses four, two and one columns', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Responsive column check runs once')
  await page.goto('/es/projects/cestia/')

  const grid = page
    .locator('.gallery-group')
    .filter({ hasText: 'En móvil' })
    .locator('.shots')

  const columns = async () =>
    grid.evaluate(
      (element) => getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
    )

  expect(await columns()).toBe(4)
  await page.setViewportSize({ width: 768, height: 900 })
  expect(await columns()).toBe(2)
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await columns()).toBe(1)

  const frames = await grid.locator('.shot__frame').evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect()
      return { width: Math.round(box.width), height: Math.round(box.height) }
    }),
  )
  expect(new Set(frames.map((frame) => frame.width)).size).toBe(1)
  expect(frames[0]!.height).toBeGreaterThan(frames[0]!.width)
})

test('NeuraClinic gallery is keyboard operable', async ({ page }) => {
  await page.goto('/es/projects/neuraclinic/')
  const openers = page.locator('[data-gallery-open]')
  await expect(openers).toHaveCount(6)

  await openers.first().click()
  const dialog = page.locator('[data-gallery-dialog]')
  await expect(dialog).toBeVisible()
  await expect(page.locator('[data-gallery-counter]')).toHaveText('1 / 6')

  await page.keyboard.press('ArrowRight')
  await expect(page.locator('[data-gallery-counter]')).toHaveText('2 / 6')

  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})

test('Comledge publishes no source or deployment links', async ({ page }) => {
  await page.goto('/es/projects/comledge/')
  const external = await page.locator('article a[href^="http"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  )
  expect(external).toEqual([])
  await expect(page.getByText('Proyecto privado').first()).toBeVisible()
  await expect(page.locator('[data-gallery-open]')).toHaveCount(2)
})

test('Cestia links to its live app and excludes debt splitting', async ({ page }) => {
  await page.goto('/es/projects/cestia/')
  await expect(page.locator('a[href="https://cestia.chelalo.me"]')).toBeVisible()
  await expect(page.locator('.prose')).toContainText('no calcula deudas')
})

test('Cestia publishes real local captures instead of an interface mockup', async ({ page }) => {
  await page.goto('/es/projects/cestia/')
  await expect(page.locator('[data-gallery-open]')).toHaveCount(12)
  await expect(page.locator('.project-media img')).toHaveCount(1)
  await expect(page.locator('body')).not.toContainText('Representación de interfaz')
  await expect(page.locator('.prose')).toContainText('entorno local')
})

test('ChaosLab separates shipped and conceptual capabilities', async ({ page }) => {
  await page.goto('/en/projects/chaoslab/')
  await expect(page.locator('.prose')).toContainText('Available today')
  await expect(page.locator('.prose')).toContainText('Conceptual')
  await expect(page.locator('.prose')).not.toContainText('github.com')
})
