import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * Capturas reales de Cestia sobre un stack local aislado.
 *
 * Requisitos:
 * - API en http://127.0.0.1:8000
 * - SPA en http://127.0.0.1:5173
 * - Mailpit en http://127.0.0.1:8025
 * - Base demo vacía (no se ejecuta contra producción)
 *
 * Uso:
 *   node scripts/capture-cestia.mjs
 *   CESTIA_CAPTURE_DIR=/tmp/opencode/cestia-capture/shots node scripts/capture-cestia.mjs
 */

const baseURL = process.env.CESTIA_CAPTURE_URL ?? 'http://localhost:5173'
const mailpit = process.env.CESTIA_MAILPIT_URL ?? 'http://127.0.0.1:8025'
const output = resolve(
  process.env.CESTIA_CAPTURE_DIR ?? '/tmp/opencode/cestia-capture/shots',
)
const password = 'correct-horse-battery'
const suffix = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const owner = { name: 'Ana Demo', email: `ana.demo.${suffix}@example.test` }
const member = { name: 'Luis Demo', email: `luis.demo.${suffix}@example.test` }
const pendingInvite = `invitado.demo.${suffix}@example.test`

const captured = []

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForEmailToken(email, subject) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const response = await fetch(`${mailpit}/api/v1/messages`)
    if (response.ok) {
      const body = await response.json()
      const message = body.messages?.find(
        (item) =>
          item.Subject?.includes(subject) &&
          item.To?.some((recipient) => recipient.Address === email),
      )
      if (message) {
        const detail = await fetch(`${mailpit}/api/v1/message/${message.ID}`)
        if (detail.ok) {
          const text = await detail.json()
          const token = text.Text?.match(/token=([A-Za-z0-9_-]+)/)?.[1]
          if (token) return token
        }
      }
    }
    await wait(500)
  }
  throw new Error(`No email token found for ${email} / ${subject}`)
}

async function registerAndVerify(page, account) {
  await page.goto(`${baseURL}/sign-up`)
  await page.getByLabel('Nombre').fill(account.name)
  await page.getByLabel('Correo').fill(account.email)
  await page.getByLabel('Contraseña').fill(password)
  await page.getByRole('button', { name: 'Crear cuenta' }).click()
  await page.waitForURL(/\/verify-email/)

  const token = await waitForEmailToken(account.email, 'Verifica')
  await page.goto(`${baseURL}/verify-email?token=${token}`)
  await page.getByText('Correo verificado. Ya puedes iniciar sesión.').waitFor()
}

async function login(page, email) {
  await page.goto(`${baseURL}/sign-in`)
  await page.getByLabel('Correo').fill(email)
  await page.getByLabel('Contraseña').fill(password)
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.waitForURL(`${baseURL}/`)
}

async function createGroup(page) {
  await page.goto(`${baseURL}/groups`)
  await page.getByRole('button', { name: 'Nuevo grupo' }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('Nombre').fill('Casa Demo')
  await dialog.getByRole('button', { name: 'Crear' }).click()
  await page.getByRole('link', { name: /Casa Demo/ }).click()
  await page.waitForURL(/\/groups\//)
  return page.url()
}

async function createList(page, groupUrl) {
  await page.goto(groupUrl)
  await page.getByRole('button', { name: 'Nueva lista' }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('Nombre').fill('Compra semanal')
  await dialog.getByRole('button', { name: 'Crear' }).click()
  await page.getByRole('link', { name: /Compra semanal/ }).click()
  await page.waitForURL(/\/lists\//)
  return page.url()
}

async function createPersonalList(page, name) {
  await page.goto(`${baseURL}/personal`)
  await page.getByRole('button', { name: 'Nueva lista' }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('Nombre').fill(name)
  await dialog.getByRole('button', { name: 'Crear' }).click()
  await page.getByRole('link', { name }).click()
  await page.waitForURL(/\/lists\//)
  return page.url()
}

async function addItem(page, { name, quantity, price }) {
  await page.getByRole('button', { name: 'Agregar artículo' }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('Nombre').fill(name)
  await dialog.getByLabel('Cantidad').fill(quantity)
  await dialog.getByLabel('Precio unitario estimado').fill(price)
  await dialog.getByRole('button', { name: 'Guardar' }).click()
  await page.getByText(name, { exact: true }).first().waitFor()
}

async function purchase(page, { name, price, payer }) {
  const row = page.locator('[class*=itemRow]').filter({ hasText: name }).first()
  await row.getByRole('button', { name: 'Registrar compra' }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('Precio unitario real').fill(price)
  if (payer) {
    await dialog.getByRole('button', { name: 'Pagador' }).click()
    await page.getByRole('option', { name: payer }).click()
  }
  await dialog.getByRole('button', { name: 'Registrar compra' }).click()
  await dialog.waitFor({ state: 'hidden' })
}

async function invite(page, groupUrl, email) {
  await page.goto(`${baseURL}${new URL(groupUrl).pathname}`)
  await page.getByRole('link', { name: 'Integrantes' }).click()
  await page.locator('#invite-email').fill(email)
  await page.getByRole('button', { name: 'Invitar por correo' }).click()
  await page.getByText('Invitación encolada. Se enviará por correo.').waitFor()
}

async function filterByGroup(page) {
  await page.getByRole('button', { name: 'Espacio' }).click()
  await page.getByRole('option', { name: 'Casa Demo' }).click()
  await page.waitForTimeout(500)
}

async function capture(page, name) {
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(600)
  await page.screenshot({
    path: resolve(output, `${name}.png`),
    animations: 'disabled',
    fullPage: false,
  })
  captured.push(name)
}

async function main() {
  await mkdir(output, { recursive: true })

  const browser = await chromium.launch({ channel: 'chromium' }).catch(() => chromium.launch())

  const ownerContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'es-MX',
  })
  const ownerPage = await ownerContext.newPage()

  await registerAndVerify(ownerPage, owner)
  await login(ownerPage, owner.email)
  const groupUrl = await createGroup(ownerPage)
  const listUrl = await createList(ownerPage, groupUrl)

  await addItem(ownerPage, { name: 'Café de especialidad', quantity: '2', price: '185' })
  await addItem(ownerPage, { name: 'Fruta de temporada', quantity: '1', price: '240' })
  await addItem(ownerPage, { name: 'Detergente', quantity: '1', price: '120' })

  await invite(ownerPage, groupUrl, member.email)

  const memberContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'es-MX',
  })
  const memberPage = await memberContext.newPage()
  await registerAndVerify(memberPage, member)
  await login(memberPage, member.email)

  const invitationToken = await waitForEmailToken(member.email, 'Te invitaron')
  await memberPage.goto(`${baseURL}/invitations/accept?token=${invitationToken}`)
  await memberPage.getByText('Casa Demo').waitFor()
  await memberPage.getByRole('button', { name: 'Aceptar invitación' }).click()
  await memberPage.waitForURL(/\/groups\//)

  await memberPage.getByRole('link', { name: /Compra semanal/ }).click()
  await memberPage.waitForURL(/\/lists\//)
  await purchase(memberPage, { name: 'Café de especialidad', price: '185', payer: owner.name })
  await purchase(memberPage, { name: 'Fruta de temporada', price: '240', payer: owner.name })
  await memberContext.close()

  await ownerPage.goto(listUrl)
  await ownerPage.getByText('Café de especialidad').first().waitFor()

  await invite(ownerPage, groupUrl, pendingInvite)
  await capture(ownerPage, 'cestia-members-desktop')
  await ownerPage.getByText(pendingInvite).first().scrollIntoViewIfNeeded()
  await capture(ownerPage, 'cestia-invitations-desktop')

  const personalListUrl = await createPersonalList(ownerPage, 'Café de la semana')
  await addItem(ownerPage, { name: 'Café en grano', quantity: '1', price: '210' })
  await purchase(ownerPage, { name: 'Café en grano', price: '210' })

  await ownerPage.goto(listUrl)
  await capture(ownerPage, 'cestia-list-desktop')

  const pendingRow = ownerPage
    .locator('[class*=itemRow]')
    .filter({ hasText: 'Detergente' })
    .first()
  await pendingRow.getByRole('button', { name: 'Registrar compra' }).click()
  await ownerPage.getByRole('dialog').waitFor()
  await capture(ownerPage, 'cestia-purchase-desktop')
  await ownerPage.keyboard.press('Escape')

  await ownerPage.goto(`${baseURL}/groups`)
  await ownerPage.getByRole('link', { name: /Casa Demo/ }).click()
  await ownerPage.waitForURL(/\/groups\//)
  await capture(ownerPage, 'cestia-group-desktop')

  await ownerPage.goto(`${baseURL}/expenses`)
  await filterByGroup(ownerPage)
  await capture(ownerPage, 'cestia-expenses-desktop')

  await ownerPage.goto(`${baseURL}/history`)
  await filterByGroup(ownerPage)
  await capture(ownerPage, 'cestia-history-desktop')

  await ownerPage.goto(`${baseURL}/`)
  await capture(ownerPage, 'cestia-dashboard-desktop')

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: 'es-MX',
  })
  const mobilePage = await mobileContext.newPage()
  await login(mobilePage, owner.email)

  await mobilePage.goto(listUrl)
  await mobilePage
    .locator('[class*=itemRow]')
    .first()
    .evaluate((element) => element.scrollIntoView({ block: 'center' }))
  await capture(mobilePage, 'cestia-list-mobile')

  await mobilePage.goto(groupUrl)
  await mobilePage
    .getByRole('link', { name: /Compra semanal/ })
    .evaluate((element) => element.scrollIntoView({ block: 'center' }))
  await capture(mobilePage, 'cestia-group-mobile')

  await mobilePage.goto(`${baseURL}/expenses`)
  await filterByGroup(mobilePage)
  await mobilePage
    .getByText('GASTADO REAL')
    .first()
    .evaluate((element) => element.scrollIntoView({ block: 'center' }))
  await capture(mobilePage, 'cestia-expenses-mobile')

  await mobilePage.goto(`${baseURL}/history`)
  await filterByGroup(mobilePage)
  await mobilePage
    .locator('[class*=historyRow]')
    .first()
    .evaluate((element) => element.scrollIntoView({ block: 'center' }))
  await capture(mobilePage, 'cestia-history-mobile')

  await mobileContext.close()
  await ownerContext.close()
  await browser.close()

  console.log(
    JSON.stringify(
      {
        output,
        account: { owner: owner.email, member: member.email },
        groupUrl,
        listUrl,
        personalListUrl,
        captured,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
