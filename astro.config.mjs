// @ts-check
import { defineConfig } from 'astro/config'

/**
 * Fully static output. S3 + CloudFront serve the generated `dist` directory;
 * no SSR adapter, API routes or application server are required.
 */
export default defineConfig({
  site: 'https://chelalo.me',
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory',
  },
  image: {
    responsiveStyles: true,
  },
  devToolbar: {
    enabled: false,
  },
})
