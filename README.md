# chelalo.me

Portafolio personal de Eduardo Saavedra. Sitio bilingüe generado completamente como HTML estático con Astro, desplegado en S3 y servido por CloudFront.

## Stack

- Astro 7 + TypeScript (`output: 'static'`)
- CSS con tokens propios; sin framework de UI en runtime
- Contenido de casos de estudio en Markdown con validación de esquema y secciones
- Imágenes optimizadas con Astro Assets
- Playwright para validación end-to-end

No hay React, servidor de aplicación, API, autenticación ni rutas renderizadas en el cliente.

## Comandos

Requiere Node.js 24.

```bash
npm ci
npm run dev
npm run validate
npm run check
npm run build
npm run test:e2e
```

`npm run build` ejecuta primero la validación editorial y genera `dist/`.

Para revisar el artefacto estático antes de publicarlo:

```bash
npm run build
node scripts/serve-dist.mjs
```

## Estructura

```text
src/
  assets/              Imágenes importadas y optimizadas por Astro
  components/          Header, footer, tarjetas, galería, terminal, UI
  content/projects/    Ocho casos localizados (4 proyectos × ES/EN)
  data/                Perfil, experiencia, formación, habilidades, galerías
  i18n/                Diccionarios y helpers de rutas/localización
  layouts/             BaseLayout
  pages/               Rutas estáticas y endpoints de SEO
  styles/              Tokens, estilos globales y movimiento
  scripts/             Mejora progresiva (header, reveals)
scripts/               Validación, servidor local y generación de OG
tests/                 Pruebas Playwright desktop/móvil
```

## Contenido

Cada caso tiene un archivo `src/content/projects/<proyecto>.<locale>.md`. El frontmatter define slug público (`project`), idioma, orden, resumen, rol, periodo, estado, stack, destacados y enlaces permitidos.

El cuerpo debe conservar estas secciones:

- ES: Contexto, Problema, Enfoque, Arquitectura, Decisiones, Resultados y estado.
- EN: Context, Problem, Approach, Architecture, Decisions, Outcomes and status.

`npm run validate` comprueba:

- Pares ES/EN completos y orden único.
- Secciones obligatorias.
- Ausencia de cadenas internas prohibidas.
- Comledge sin URLs públicas de despliegue o código.
- Cestia sin cálculo de deudas.
- ChaosLab con separación entre funciones disponibles y conceptuales.

## Imágenes

Las capturas publicadas se importan desde `src/assets/projects/` y Astro genera variantes WebP responsivas. Las imágenes de "Trabajo anterior" se retiraron junto con esa sección.

Antes de añadir una captura nueva, sigue [`docs/capture-workflow.md`](docs/capture-workflow.md) y actualiza [`docs/image-inventory.md`](docs/image-inventory.md). Las capturas sin revisar y las sesiones de navegador no se versionan; solo se versionan las copias aprobadas en `src/assets/`.

Para recapturar Cestia, levanta su stack local aislado con API, SPA y Mailpit, y ejecuta:

```bash
node scripts/capture-cestia.mjs
```

El script crea cuentas y datos ficticios mediante la API real y no debe apuntar a producción.

## Navegación

«Proyectos» lleva a la sección de la home (`#projects`); el índice completo se abre desde «Todos los proyectos». Los cambios de documento usan una transición nativa de 160 ms cuando el navegador la soporta y se desactiva con `prefers-reduced-motion`.

## Privacidad

- No se publican datos clínicos, clientes, usuarios, secretos, endpoints internos ni repositorios privados.
- Comledge no incluye enlace de despliegue ni de código.
- NeuraClinic y Comledge usan datos ficticios o de ejemplo.
- Cestia usa capturas de un entorno local con datos ficticios, no de producción.
- COEN no expone nombres de clientes ni proyectos internos.

## Despliegue

`.github/workflows/cd.yaml` publica `dist/` en S3 e invalida CloudFront en cada push a `main`. El workflow `ci.yaml` valida pull requests sin desplegar.

En CloudFront/S3 deben mantenerse:

- `index.html` como default root object.
- Índices de directorio para rutas con slash final (`/es/`, `/es/projects/...`).
- Página de error 404 apuntando a `/404.html` si se desea conservar el diseño en errores de S3.

Conserva el artefacto anterior antes de publicar. Para revertir, vuelve a sincronizar ese artefacto e invalida CloudFront; no dependas de reconstruir una versión antigua.
