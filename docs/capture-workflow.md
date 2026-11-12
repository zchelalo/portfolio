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

- Viewports: `1440×900` y `390×844`, DPR 1.
- Idioma y tema explícitos y consistentes dentro de una galería.
- Espera fuentes, imágenes y estados visibles; no ocultes errores de carga.
- Captura solo el contenido de la página, no la barra del navegador ni el escritorio.
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
3. Ejecuta `npm run validate`, `npm run check`, `npm run build` y `npm run test:e2e`.
4. Inspecciona el HTML y las imágenes generadas para detectar texto no deseado.

## Referencias existentes

- **NeuraClinic:** `neuraclinic-web/scripts/capture-landing-product-screenshots.mjs` usa datos ficticios e intercepta respuestas de API. No lo trates como evidencia de autenticación real; revisa cada imagen antes de publicarla.
- **Comledge:** `apps/web-e2e/tests/review-screenshots.spec.ts` captura un entorno local con datos de ejemplo. No ejecutes el seed contra producción ni publiques vistas administrativas sin revisión.
- **Cestia:** `scripts/capture-cestia.mjs` del portafolio crea cuentas y datos ficticios mediante la API real, en un stack local aislado, y captura desktop/móvil. `apps/web-e2e/tests/support.ts` y `purchase-flow.spec.ts` documentan los mismos flujos. Requiere API, SPA y Mailpit locales; no se ejecuta contra producción.

No ejecutes todos los proyectos a la vez: Cestia y Comledge comparten puertos por defecto.
