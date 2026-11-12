import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const outputDir = resolve(root, 'public/files')

const documents = [
  {
    input: 'scripts/cv/cv-es.html',
    output: 'EduardoSaavedra-cv-es.pdf',
    footer: `
      <div style="width:100%; padding:0 0.65in; font-family:Ubuntu,Arial,sans-serif; font-size:7.5px; color:#586b8a; display:flex; justify-content:space-between;">
        <span>Eduardo Saavedra · Currículum</span>
        <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `,
  },
  {
    input: 'scripts/cv/cv-en.html',
    output: 'EduardoSaavedra-cv-en.pdf',
    footer: `
      <div style="width:100%; padding:0 0.65in; font-family:Ubuntu,Arial,sans-serif; font-size:7.5px; color:#586b8a; display:flex; justify-content:space-between;">
        <span>Eduardo Saavedra · Resume</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `,
  },
]

await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch()

try {
  for (const document of documents) {
    const page = await browser.newPage()
    await page.goto(pathToFileURL(resolve(root, document.input)).href, { waitUntil: 'load' })
    await page.emulateMedia({ media: 'print' })
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({
      path: resolve(outputDir, document.output),
      format: 'Letter',
      printBackground: true,
      tagged: true,
      outline: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: document.footer,
      margin: { top: '0.5in', bottom: '0.55in', left: '0.65in', right: '0.65in' },
    })
    await page.close()
    console.log(`Generated public/files/${document.output}`)
  }
} finally {
  await browser.close()
}
