# Procedimiento de capturas

Objetivo: producir imágenes de producto reproducibles, con datos ficticios, sin exponer información privada y sin presentar maquetas como capturas auténticas.

## 1. Aislamiento

- Usa un entorno local o un entorno demo explícitamente autorizado.
- No restaures bases de producción ni reutilices `.env` reales.
- Usa volúmenes y bases desechables.
- Para correo, usa Mailpit; para pagos, sandbox; para archivos, almacenamiento local.
- Nunca versiones cookies, tokens, storage state, trazas, HAR ni credenciales.

## 2. Cuentas y datos

- Crea usuarios demo con nombres ficticios (`Demo`, `Ejemplo`, dominio `example.test`).
- Los seeds deben ser idempotentes y ejecutarse solo en desarrollo.
- No uses nombres de pacientes, clientes, empleados ni documentos reales.
- No introduzcas importes, diagnósticos o conversaciones reales.

## 3. Acceso

- Inicia sesión con las cuentas demo y permisos reales.
- No simules autenticación para afirmar que una captura es auténtica.
- Si no puedes acceder de forma segura, documenta el bloqueo. Una maqueta HTML/CSS puede publicarse solo si se etiqueta como representación de interfaz.

## 4. Captura

- Viewports: `1440×900` y `390×844`, DPR 2.
- Idioma y tema explícitos y consistentes dentro de una galería.
- Espera fuentes, imágenes y estados visibles; no ocultes errores de carga.
- Captura solo el contenido de la página, no la barra del navegador ni el escritorio.
- En móvil captura el viewport (`fullPage: false`); una página completa deforma la escala al encajarla en la galería.
- Desactiva animaciones no esenciales; no falsees estados de éxito.
- Guarda originales en `/tmp/opencode/portfolio-review/` o fuera del repositorio.

## 5. Revisión

Checklist por imagen:

- [ ] Rol y ruta correctos.
- [ ] Datos ficticios y sin PII.
- [ ] Sin credenciales, tokens, hosts internos ni URLs administrativas.
- [ ] Sin nombres de organizaciones o clientes no autorizados.
- [ ] Sin importes financieros reales.
- [ ] Alt y caption localizados.
- [ ] Origen y fecha registrados en `docs/image-inventory.md`.
- [ ] Aprobación del propietario.

## 6. Publicación

1. Copia solo las imágenes aprobadas a `src/assets/projects/<proyecto>/`.
2. Impórtalas en `src/data/galleries.ts` con alt y caption ES/EN.
3. Ejecuta `pnpm run validate`, `pnpm run check`, `pnpm run build` y `pnpm run test:e2e`.
4. Inspecciona el HTML y las imágenes generadas para detectar texto no deseado.

## Referencias existentes

- **NeuraClinic:** `neuraclinic-web/scripts/capture-landing-product-screenshots.mjs` captura la aplicación con API ficticia interceptada. La landing se captura desde su implementación pública. Para DPR 2, ejecuta una copia temporal del script con `deviceScaleFactor: 2`. No trates las capturas de la app como evidencia de autenticación real; revisa cada imagen antes de publicarla.
- **Comledge:** levanta el stack local aislado con PostgreSQL, MinIO y API, ejecuta el seed de desarrollo y crea artículos de ejemplo mediante la API o la interfaz. Captura la biblioteca, el artículo, la administración y las vistas móviles con Playwright. No ejecutes el seed contra producción ni publiques vistas administrativas sin revisión.
- **Cestia:** `scripts/capture-cestia.mjs` del portafolio crea cuentas y datos ficticios mediante la API real, en un stack local aislado, y captura desktop/móvil. `apps/web-e2e/tests/support.ts` y `purchase-flow.spec.ts` documentan los mismos flujos. Requiere API, SPA y Mailpit locales; no se ejecuta contra producción.

No ejecutes todos los proyectos a la vez: Cestia y Comledge comparten puertos por defecto.
