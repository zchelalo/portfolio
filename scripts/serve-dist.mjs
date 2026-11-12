import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'

const root = resolve('dist')
const port = Number(process.env.PORT ?? 4321)
const host = process.env.HOST ?? '127.0.0.1'

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
}

async function fileFor(urlPath) {
  const pathname = decodeURIComponent(new URL(urlPath, 'http://localhost').pathname)
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  let candidate = join(root, safePath)

  if (pathname.endsWith('/')) candidate = join(candidate, 'index.html')

  try {
    const info = await stat(candidate)
    if (info.isDirectory()) candidate = join(candidate, 'index.html')
    await stat(candidate)
    return candidate
  } catch {
    if (!extname(candidate)) {
      try {
        const withIndex = join(candidate, 'index.html')
        await stat(withIndex)
        return withIndex
      } catch {
        /* Not a directory route. */
      }
    }
    return null
  }
}

const server = createServer(async (request, response) => {
  const file = await fileFor(request.url ?? '/')

  if (!file) {
    try {
      const notFound = await readFile(join(root, '404.html'))
      response.writeHead(404, { 'Content-Type': mime['.html'] })
      response.end(notFound)
    } catch {
      response.writeHead(404, { 'Content-Type': mime['.txt'] })
      response.end('Not found')
    }
    return
  }

  const body = await readFile(file)
  response.writeHead(200, {
    'Content-Type': mime[extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  })
  response.end(body)
})

server.listen(port, host, () => {
  console.log(`Serving dist at http://${host}:${port}`)
})
